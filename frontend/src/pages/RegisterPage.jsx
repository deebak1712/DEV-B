import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerApi } from "../api/authApi"

function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await registerApi(formData)
      navigate("/login")
    } catch (err) {
      setError("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#F8F9FB] via-[#EEF2FF] to-[#F8F9FB]">
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-10 w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-semibold text-[#111827] mb-6 text-center">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3.5 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3.5 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3.5 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl"
          />

          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium rounded-xl transition-all"
          >
            {loading ? "Creating..." : "Register"}
          </button>
          <div className="text-center mt-6">
            <p className="text-sm text-[#6B7280]">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#2563EB] font-medium cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage