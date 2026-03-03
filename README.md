🛡 FraudShield AI
Intelligent Digital Payment Fraud Detection & Monitoring Platform

A production-style full-stack fraud detection system built with FastAPI and React + Vite + Tailwind CSS, simulating a real-world banking fraud monitoring infrastructure.

🚀 Overview

FraudShield AI is a real-time transaction risk analysis and monitoring system designed to simulate modern banking fraud detection platforms.

It evaluates transactions using a multi-layer risk engine and produces:

📊 Risk Score (0–100)

🔐 Automated Decision (APPROVE / OTP_REQUIRED / BLOCK)

⚠ Detailed Fraud Reasons

🛡 Admin Override Controls

📈 Analytics & Monitoring Dashboard

🏗 System Architecture
🔹 Backend – FastAPI

JWT Authentication

Role-Based Access Control (User / Admin)

Multi-Layer Risk Engine

OTP Simulation Service

Admin Override Mechanism

MySQL Database (SQLAlchemy ORM)

RESTful API Design

🔹 Frontend – React + Vite + Tailwind

Protected & Role-Based Routes

Context API State Management

Lazy Loading with React Suspense

Skeleton Loaders

Chart.js Analytics Dashboard

Clean SaaS UI Architecture

🧠 Risk Engine Architecture

FraudShield AI follows a 3-Layer Risk Scoring Model:

1️⃣ Rule Engine

Detects obvious fraud indicators:

High Amount Transactions

Transaction Frequency Spikes

Unusual Time Activity

Location Mismatch

New Device Detection

Failed Attempt Tracking

2️⃣ Behaviour Engine

Analyzes deviation patterns:

Device Deviation Detection

Time-Based Anomaly Analysis

3️⃣ Context Engine

Environmental risk evaluation:

High-Risk Geographic Location Detection

🎯 Decision Logic
Risk Score Range	Final Decision
0 – 30	APPROVE
31 – 70	OTP_REQUIRED
71 – 100	BLOCK
📊 Feature Breakdown
👤 User Panel

Secure Registration & Login (JWT)

Submit Transaction

Real-Time Risk Evaluation

OTP Verification Flow

Personal Dashboard Analytics

Transaction History Tracking

🛡 Admin Panel

View All Transactions

Filter by:

Decision

Risk Score Range

User ID

Pagination Support

Detailed Transaction View

Fraud Reason Display

Force Approve / Force Block

Mark as Reviewed

Add Admin Remarks

Analytics Dashboard with Charts

🎨 UI Highlights

Apple-Inspired Minimal SaaS Design

Fully Responsive Layout

Lazy-Loaded Pages

Skeleton Loading States

Animated Charts

Toast Notifications

Page-Level Loader Animations

Clean Component-Based Structure

🛠 Tech Stack
Backend

FastAPI

SQLAlchemy

MySQL

python-jose (JWT)

Passlib (bcrypt)

Uvicorn

Frontend

React

Vite

Tailwind CSS

React Router

Chart.js

Axios

📂 Project Structure
backend/
│
├── main.py
├── auth.py
├── database.py
├── models_db.py
├── risk_engine.py
├── rules.py
├── otp_service.py
└── .env
Frontend
src/
│
├── api/
├── context/
├── pages/
├── components/
│   ├── common/
│   ├── layout/
│   └── transaction/
└── App.jsx
⚙ Installation & Setup
1️⃣ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

Backend URL:

http://localhost:8000
2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend URL:

http://localhost:5173
🔐 Authentication Flow

User logs in → JWT generated

Token stored in localStorage

Axios attaches Bearer token

Backend validates token

Role-based routing enforced

Admin/User access controlled dynamically

🧩 Engineering Concepts Demonstrated

Secure JWT Authentication

Role-Based Access Control (RBAC)

Multi-Layer Risk Scoring Architecture

Context-Based State Management

Admin Override Workflow

Skeleton Loading UX Pattern

Clean RESTful API Design

Scalable Component Architecture

Separation of Concerns

🔒 Security Considerations

Password hashing using bcrypt

Token-based stateless authentication

Role-based endpoint protection

Server-side risk evaluation

Controlled override auditing structure

📈 Future Enhancements

Real SMS OTP Integration

WebSocket Real-Time Monitoring

Transaction Audit Logs

CSV Export Feature

Dockerized Deployment

Cloud Hosting (AWS / Render)

Machine Learning Risk Model Upgrade
