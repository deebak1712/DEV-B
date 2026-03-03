from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="user")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    transactions = relationship("Transaction", back_populates="user")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float, nullable=False)
    time = Column(String(10))
    location = Column(String(100))
    device = Column(String(50))
    tx_count_last_min = Column(Integer)
    failed_attempts = Column(Integer)
    risk_score = Column(Float)
    decision = Column(String(50))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    admin_remark = Column(Text, nullable=True)
    reviewed = Column(String(10), default="NO")
    overridden_decision = Column(String(50), nullable=True)

    user = relationship("User", back_populates="transactions")


class OTPRecord(Base):
    __tablename__ = "otp_records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    otp = Column(String(10))
    expires_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class FraudLog(Base):
    __tablename__ = "fraud_logs"

    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(Integer)
    reasons = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())