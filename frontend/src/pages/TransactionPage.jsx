import { useState } from "react"
import { checkTransactionApi } from "../api/transactionApi"
import TransactionForm from "../components/transaction/TransactionForm"
import ResultModal from "../components/transaction/ResultModal"
import OTPModal from "../components/transaction/OTPModal"
import { useAuth } from "../context/AuthContext"
import { useTransactions } from "../context/TransactionContext"

function TransactionPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [otpRequired, setOtpRequired] = useState(false)
  const [pendingResult, setPendingResult] = useState(null)

  const { user } = useAuth()

  const { addTransaction } = useTransactions()

  const handleSubmit = async (formData) => {
    setLoading(true)

    try {
      const now = new Date()
      const time = now.toTimeString().slice(0, 5)

      const payload = {
        user_id: user?.username,
        amount: Number(formData.amount),
        time: time,
        location: formData.location,
        device: "new",
        tx_count_last_min: 1,
        failed_attempts: 0,
      }

      const data = await checkTransactionApi(payload)

      if (data.decision === "OTP_REQUIRED") {
        setPendingResult(data)
        setOtpRequired(true)
      } else {
        addTransaction(data)
        setResult(data)
      }

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSuccess = () => {
    if (!pendingResult) return

    setOtpRequired(false)
    setResult({
      ...pendingResult,
      decision: "APPROVE",
    })
    addTransaction({
      ...pendingResult,
      decision: "APPROVE",
    })
  }

  const closeModal = () => {
    setResult(null)
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-[#F8F9FB]">
      <div className="bg-white border border-black rounded-3xl p-10 w-full max-w-xl shadow-xl">

        {/* TITLE INSIDE CARD */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#111827]">
            New Transaction
          </h1>
          <p className="text-[#6B7280] mt-2">
            Analyze a transaction for fraud risk assessment
          </p>
        </div>

        <TransactionForm onSubmit={handleSubmit} loading={loading} />
      </div>

      {result && (
        <ResultModal result={result} onClose={closeModal} />
      )}

      {otpRequired && (
        <OTPModal
          userId="1"
          onSuccess={handleOtpSuccess}
          onClose={() => setOtpRequired(false)}
        />
      )}
    </div>
  )
}

export default TransactionPage