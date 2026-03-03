from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
import logging

from risk_engine import calculate_final_risk
from otp_service import generate_otp, save_otp, verify_otp

from database import engine, SessionLocal
from models_db import Base, Transaction as DBTransaction, FraudLog

from auth import hash_password, create_access_token, authenticate_user, get_current_user
from models_db import User

from fastapi.security import OAuth2PasswordRequestForm

# ----------------------------
# Logging Setup
# ----------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# ----------------------------
# FastAPI App
# ----------------------------
app = FastAPI(title="Digital Payment Fraud Detection")

# Create Tables Automatically
Base.metadata.create_all(bind=engine)

# ----------------------------
# CORS
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Database Dependency
# ----------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----------------------------
# Root API
# ----------------------------
@app.get("/")
def root():
    return {"status": "Backend running"}

# ----------------------------
# Request Models
# ----------------------------
class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str

class TransactionRequest(BaseModel):
    user_id: str
    amount: float
    time: str
    location: str
    device: str
    tx_count_last_min: int
    failed_attempts: int


class OTPVerifyRequest(BaseModel):
    user_id: str
    otp: str

def require_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

@app.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == data.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    new_user = User(
        username=data.username,
        email=data.email,
        hashed_password=hash_password(data.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token = create_access_token(
        data={
            "sub": user.username,
            "role": user.role
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@app.get("/admin/transactions")
def get_all_transactions(db: Session = Depends(get_db),admin: User = Depends(require_admin)):
    transactions = db.query(DBTransaction).all()

    result = []

    for tx in transactions:
        fraud_log = db.query(FraudLog).filter(
            FraudLog.transaction_id == tx.id
        ).first()

        result.append({
            "id": tx.id,
            "user_id": tx.user_id,
            "amount": tx.amount,
            "location": tx.location,
            "device": tx.device,
            "time": tx.time,
            "risk_score": tx.risk_score,
            "decision": tx.decision,
            "created_at": tx.created_at,
            "reviewed": tx.reviewed,
            "reasons": fraud_log.reasons.split("; ") if fraud_log else []
        })

    return {"transactions": result}

@app.get("/admin/analytics")
def admin_analytics(db: Session = Depends(get_db),admin: User = Depends(require_admin)):
    transactions = db.query(DBTransaction).all()

    total = len(transactions)
    blocked = len([t for t in transactions if t.decision == "BLOCK"])
    otp = len([t for t in transactions if t.decision == "OTP_REQUIRED"])
    approved = len([t for t in transactions if t.decision == "APPROVE"])

    return {
        "total": total,
        "approved": approved,
        "blocked": blocked,
        "otp_required": otp
    }

@app.put("/admin/transaction/{transaction_id}/action")
def admin_action(
    transaction_id: int,
    action: dict,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    tx = db.query(DBTransaction).filter(
        DBTransaction.id == transaction_id
    ).first()

    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")

    if action.get("override_decision"):
        tx.overridden_decision = action["override_decision"]

    if action.get("remark"):
        tx.admin_remark = action["remark"]

    tx.reviewed = "YES"

    db.commit()

    return {"message": "Transaction updated successfully"}

# ----------------------------
# Check Transaction API
# ----------------------------
@app.post("/check-transaction")
def check_transaction(data: TransactionRequest,db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    try:
        result = calculate_final_risk(data.dict())
        logging.info(f"Transaction processed for user {data.user_id}")

        # ----------------------------
        # Save Transaction in DB
        # ----------------------------
        new_transaction = DBTransaction(
            user_id=current_user.id,
            amount=data.amount,
            time=data.time,
            location=data.location,
            device=data.device,
            tx_count_last_min=data.tx_count_last_min,
            failed_attempts=data.failed_attempts,
            risk_score=result["final_risk_score"],
            decision=result["decision"]
        )

        db.add(new_transaction)
        db.commit()
        db.refresh(new_transaction)

        # ----------------------------
        # Save Fraud Reasons
        # ----------------------------
        if result["reasons"]:
            fraud_log = FraudLog(
                transaction_id=new_transaction.id,
                reasons="; ".join(result["reasons"])
            )
            db.add(fraud_log)
            db.commit()

        # ----------------------------
        # OTP Logic
        # ----------------------------
        if result["decision"] == "OTP_REQUIRED":
            otp = generate_otp()
            print("Generated OTP:", otp)
            save_otp(data.user_id, otp)
            result["note"] = "OTP sent to registered mobile number"

        return result

    except Exception as e:
        logging.error(f"Error processing transaction: {str(e)}")
        raise HTTPException(status_code=500, detail="Transaction processing failed")


# ----------------------------
# OTP Verification API
# ----------------------------
@app.post("/verify-otp")
def verify_transaction(data: OTPVerifyRequest):
    logging.info(f"OTP verification attempt for user {data.user_id}")
    if verify_otp(data.user_id, data.otp):
        return {"status": "SUCCESS", "message": "Transaction Approved"}
    else:
        raise HTTPException(status_code=401, detail="Invalid OTP")


# ----------------------------
# Global Exception Handler
# ----------------------------
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.error(f"Unhandled error: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error"},
    )