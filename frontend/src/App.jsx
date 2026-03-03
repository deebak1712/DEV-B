import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"

import ProtectedRoute from "./components/common/ProtectedRoute"
import AdminRoute from "./components/common/AdminRoute"
import Navbar from "./components/layout/Navbar"
import PageLoader from "./components/common/PageLoader"

import { AuthProvider } from "./context/AuthContext"
import { TransactionProvider } from "./context/TransactionContext"

const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const DashboardPage = lazy(() => import("./pages/DashboardPage"))
const TransactionPage = lazy(() => import("./pages/TransactionPage"))
const AdminPage = lazy(() => import("./pages/AdminPage"))

function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/transaction"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <TransactionPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <Navbar />
                    <AdminPage />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" />} />

          </Routes>
        </Suspense>
      </TransactionProvider>
    </AuthProvider>
  )
}

export default App