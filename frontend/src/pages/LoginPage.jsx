import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginApi } from "../api/authApi"
import { useAuth } from "../context/AuthContext"

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const data = await loginApi({ email, password })
      login(data)
      navigate("/dashboard")
    } catch (err) {
      setError("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#F8F9FB] via-[#EEF2FF] to-[#F8F9FB]">
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-10 w-full max-w-md shadow-xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[#111827] tracking-tight">
            FraudShield AI
          </h1>
          <p className="text-[#6B7280] mt-2 font-light">Welcome back</p>
          <p className="text-[#6B7280] text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-4 py-3.5 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl text-[#111827] placeholder-[#9CA3AF] hover:border-[#D1D5DB] focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl text-[#111827] placeholder-[#9CA3AF] hover:border-[#D1D5DB] focus:border-[#2563EB]"
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium rounded-xl transition-all duration-200 mt-6 shadow-md hover:shadow-lg"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage