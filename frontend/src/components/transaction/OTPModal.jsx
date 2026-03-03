import { useState } from "react"
import { verifyOtpApi } from "../../api/transactionApi"

function OTPModal({ userId, onSuccess, onClose }) {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleVerify = async () => {
    setLoading(true)
    setError("")

    try {
      await verifyOtpApi({ user_id: userId, otp })
      onSuccess()
    } catch (err) {
      setError("Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-3xl w-full max-w-sm shadow-xl border border-black"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-[#111827] mb-4 text-center">
          Enter OTP
        </h2>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          className="w-full px-4 py-3 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl mb-4"
        />

        {error && (
          <p className="text-sm text-red-500 mb-3 text-center">{error}</p>
        )}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-3 bg-[#2563EB] text-white rounded-xl"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  )
}

export default OTPModal