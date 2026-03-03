# Fraud Detection Backend API

A simple **FastAPI backend** for detecting transaction fraud risk and handling basic OTP verification.

---

## 🧠 What It Does

This API evaluates digital payment transactions and returns one of three decisions:

- ✅ **APPROVE** – Safe to process  
- 🔐 **OTP_REQUIRED** – Requires user to verify with a one‑time password  
- ❌ **BLOCK** – Transaction likely fraud  

Decisions are based on a set of rule checks, behavioural signals, and context risk.

---

## ⚙️ Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/deebak1712/DEV-B.git
   cd DEV-B
