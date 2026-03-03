import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useTransactions } from "../../context/TransactionContext"
import { useState, useEffect, useRef } from "react"

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const { transactions } = useTransactions()
  const blockedCount = transactions.filter(
    t => t.decision === "BLOCK"
  ).length

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const navLinkClass = ({ isActive }) =>
    `nav-link px-5 py-2 text-sm font-medium text-[#6B7280] hover:text-[#111827] rounded-lg transition-colors relative ${isActive ? "text-[#111827] active" : ""
    }`

  const username = user?.username || "User"
  const avatarLetter = username.charAt(0).toUpperCase()

  const storedTransactions =
    JSON.parse(localStorage.getItem("transactions") || "[]")

  const notifications = storedTransactions
    .filter(
      (tx) =>
        tx.decision === "BLOCK" || tx.decision === "OTP_REQUIRED"
    )
    .slice(-5)
    .reverse()

  return (
    <nav
      className="h-16 bg-white border-b flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-50"
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* LEFT LOGO */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-xl flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>

        <span className="font-semibold text-[#111827] text-lg tracking-tight">
          FraudShield AI
        </span>
      </div>

      {/* CENTER NAVIGATION */}
      <div className="flex items-center gap-1">
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/transaction" className={navLinkClass}>
          New Transaction
        </NavLink>

        {user?.role === "admin" && (
          <NavLink to="/admin" className={navLinkClass}>
            Admin
          </NavLink>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-xl transition-colors ${showNotifications ? "bg-[#e3e5eb56] hover:bg-[#e2e6ef] text-[#000000] border border-[#6B7280]" : ""}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>

            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-[#6B7280] rounded-2xl shadow-xl py-4 px-6 z-50">

              <h3 className="text-sm font-semibold text-[#111827] mb-3">
                Notifications
              </h3>

              {notifications.length === 0 ? (
                <p className="text-sm text-[#6B7280]">
                  No notifications
                </p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {notifications.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]"
                    >
                      <p className="text-sm font-medium">
                        Transaction #{tx.id}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        Decision: {tx.decision}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        Risk: {tx.risk_score}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>
        {/* Avatar */}
        <div className="flex items-center gap-3 cursor-pointer bg-[#F8F9FB] border border-[#6B7280]/30 rounded-xl pr-3 hover:bg-[#EEF2FF] transition-colors">
          <div className="w-9 h-9 bg-[#6B7280]/30 flex items-center justify-center text-sm font-medium rounded-l-xl">
            {avatarLetter}
          </div>

          <span className="text-sm font-medium text-[#111827] hidden sm:block">
            {username}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2 text-[#6B7280] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-xl transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar