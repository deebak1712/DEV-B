from fastapi import APIRouter, HTTPException
from auth.jwt_utils import create_access_token
from otp_service import save_otp, verify_otp

# 👇 THIS LINE IS VERY IMPORTANT
router = APIRouter(prefix="/auth", tags=["Auth"])

USERS = {
    "user@mail.com": {"password": "1234", "role": "USER"},
    "admin@mail.com": {"password": "admin123", "role": "ADMIN"},
}

@router.post("/login")
def login(email: str, password: str):
    user = USERS.get(email)

    if not user or user["password"] != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    send_otp(email)
    return {"message": "OTP sent", "mfa_required": True}


@router.post("/verify-otp")
def verify(email: str, otp: str):
    if not verify_otp(email, otp):
        raise HTTPException(status_code=401, detail="Invalid OTP")

    role = USERS[email]["role"]
    token = create_access_token({"sub": email, "role": role})

    return {
        "access_token": token,
        "role": role
    }