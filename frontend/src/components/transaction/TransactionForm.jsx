import { useState } from "react"

function TransactionForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    amount: "",
    location: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-2">
            Amount (₹)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl text-[#111827] focus:border-[#2563EB]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111827] mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl text-[#111827] focus:border-[#2563EB]"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {loading ? "Analyzing..." : "Analyze Transaction"}
        </button>
      </div>
    </form>
  )
}

export default TransactionForm