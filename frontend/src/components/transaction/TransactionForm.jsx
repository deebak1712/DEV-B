import { useState } from "react"

function TransactionForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    amount: "",
    channel: "",
    device_id: "",
    location: "",
    customer_id: "",
    transaction_type: "",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            Channel
          </label>
          <select
            name="channel"
            value={formData.channel}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl text-[#111827] focus:border-[#2563EB]"
          >
            <option value="">Select channel</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Mobile Banking">Mobile Banking</option>
            <option value="Internet Banking">Internet Banking</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111827] mb-2">
            Device ID
          </label>
          <input
            type="text"
            name="device_id"
            value={formData.device_id}
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

        <div>
          <label className="block text-sm font-medium text-[#111827] mb-2">
            Customer ID
          </label>
          <input
            type="text"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl text-[#111827] focus:border-[#2563EB]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111827] mb-2">
            Transaction Type
          </label>
          <select
            name="transaction_type"
            value={formData.transaction_type}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl text-[#111827] focus:border-[#2563EB]"
          >
            <option value="">Select type</option>
            <option value="Purchase">Purchase</option>
            <option value="Transfer">Transfer</option>
            <option value="Withdrawal">Withdrawal</option>
            <option value="Bill Payment">Bill Payment</option>
          </select>
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