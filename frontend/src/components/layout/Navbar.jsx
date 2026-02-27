import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const navLinkClass = ({ isActive }) =>
    `nav-link px-5 py-2 text-sm font-medium text-[#6B7280] hover:text-[#111827] rounded-lg transition-colors relative ${isActive ? "text-[#111827] active" : ""
    }`

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

        <NavLink to="/logs" className={navLinkClass}>
          Logs
        </NavLink>

        <NavLink to="/analytics" className={navLinkClass}>
          Analytics
        </NavLink>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-xl transition-colors">
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

          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-xl flex items-center justify-center text-white text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity">
          JD
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