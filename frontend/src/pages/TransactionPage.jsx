import { useState } from "react"
import { checkFraudApi } from "../api/fraudApi"
import TransactionForm from "../components/transaction/TransactionForm"
import ResultModal from "../components/transaction/ResultModal"

function TransactionPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      const data = await checkFraudApi(formData)
      setResult(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setResult(null)
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto w-full bg-[#F8F9FB] min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#111827]">
          New Transaction
        </h1>
        <p className="text-[#6B7280] mt-1">
          Analyze a transaction for fraud risk assessment
        </p>
      </div>

      <div className="bg-white border border-black rounded-2xl p-8 shadow">
        <TransactionForm onSubmit={handleSubmit} loading={loading} />
      </div>

      {result && (
        <ResultModal result={result} onClose={closeModal} />
      )}
    </div>
  )
}

export default TransactionPage