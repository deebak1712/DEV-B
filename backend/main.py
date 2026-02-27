from fastapi import FastAPI
from risk_engine import calculate_final_risk
from otp_service import generate_otp, save_otp, verify_otp  # <-- add save_otp, verify_otp
from auth.auth_routes import router as auth_router

app = FastAPI(title="Digital Payment Fraud Detection")
app.include_router(auth_router)
@app.get("/")
def root():
    return {"status": "Backend running"}

@app.post("/check-transaction")
def check_transaction(data: dict):
    result = calculate_final_risk(data)

    # OTP DEMO logic
    if result["decision"] == "OTP_REQUIRED":
        otp = generate_otp()
        result["otp"] = otp
        result["note"] = "OTP generated for demo purpose only"

        # Save OTP for verification
        save_otp(data["user_id"], otp)

    return result

@app.post("/verify-otp")
def verify_transaction(data: dict):
    user_id = data.get("user_id")
    otp = data.get("otp")

    if verify_otp(user_id, otp):
        return {"status": "SUCCESS", "message": "Transaction Approved"}
    else:
        return {"status": "FAIL", "message": "Invalid OTP"}