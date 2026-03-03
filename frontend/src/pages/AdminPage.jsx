import { useEffect, useState } from "react"
import { getAdminTransactions, getAdminAnalytics } from "../api/adminApi"
import { Line, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import axiosInstance from "../api/axiosInstance"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
)

function AdminPage() {
  const [adminRemark, setAdminRemark] = useState("")
  const [transactions, setTransactions] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [decisionFilter, setDecisionFilter] = useState("ALL")
  const [minRisk, setMinRisk] = useState("")
  const [maxRisk, setMaxRisk] = useState("")
  const [searchUser, setSearchUser] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [toast, setToast] = useState({ message: "", type: "" })
  const [actionLoading, setActionLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      const txData = await getAdminTransactions()
      const analyticsData = await getAdminAnalytics()

      setTransactions(txData.transactions)
      setAnalytics(analyticsData)

    } finally {
      setLoading(false)
    }
  }

  const approvedCount = transactions.filter(t => t.decision === "APPROVE").length
  const blockedCount = transactions.filter(t => t.decision === "BLOCK").length
  const otpCount = transactions.filter(t => t.decision === "OTP_REQUIRED").length

  const pieChartData = {
    labels: ["Approved", "OTP Required", "Blocked"],
    datasets: [
      {
        data: [approvedCount, otpCount, blockedCount],
        backgroundColor: ["#22C55E", "#F59E0B", "#EF4444"],
        borderWidth: 0,
        cutout: "70%",
        radius: "85%",
      }
    ]
  }

  const sorted = [...transactions].sort((a, b) => a.id - b.id)

  const lineChartData = {
    labels: sorted.map(t => `TX-${t.id}`),
    datasets: [
      {
        label: "Risk Score",
        data: sorted.map(t => t.risk_score),
        borderColor: "#2563EB",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        tension: 0.4,
        fill: true,
      }
    ]
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
      },
    },
  }

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "center",
      },
    },
  }

  const filteredTransactions = transactions.filter((tx) => {
    const matchDecision =
      decisionFilter === "ALL" || tx.decision === decisionFilter

    const matchMin =
      minRisk === "" || tx.risk_score >= Number(minRisk)

    const matchMax =
      maxRisk === "" || tx.risk_score <= Number(maxRisk)

    const matchUser =
      searchUser === "" || tx.user_id.toString().includes(searchUser)

    return matchDecision && matchMin && matchMax && matchUser
  })

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    endIndex
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [decisionFilter, minRisk, maxRisk, searchUser])

  const handleAdminAction = async (decision) => {
    try {
      setActionLoading(true)

      await axiosInstance.put(
        `/admin/transaction/${selectedTransaction.id}/action`,
        {
          override_decision: decision,
          remark: adminRemark,
        }
      )

      setSelectedTransaction(null)
      setAdminRemark("")
      fetchData()

      setToast({
        message: "Transaction updated successfully",
        type: "success",
      })

    } catch (err) {
      setToast({
        message: err.response?.data?.detail || "Something went wrong",
        type: "error",
      })
    } finally {
      setActionLoading(false)
      setTimeout(() => setToast({ message: "", type: "" }), 3000)
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <h1 className="text-2xl font-semibold text-[#111827] mb-8">
        Admin Control Panel
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Total" value={analytics?.total || 0} />
        <Card title="Approved" value={analytics?.approved || 0} />
        <Card title="OTP Required" value={analytics?.otp_required || 0} />
        <Card title="Blocked" value={analytics?.blocked || 0} />
      </div>

      {/* CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Risk Trend Line Chart */}
        <div className="bg-white border border-black rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold text-[#111827] mb-4">
            Risk Trend
          </h2>
          <div className="h-72">
            {loading ? (
              <div className="w-full h-full bg-[#F3F4F6] animate-pulse rounded-xl" />
            ) : (
              <Line data={lineChartData} options={lineChartOptions} />
            )}
          </div>
        </div>

        {/* Decision Distribution Pie */}
        <div className="bg-white border border-black rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold text-[#111827] mb-4">
            Decision Distribution
          </h2>
          <div className="h-72 flex items-center justify-center">
            {loading ? (
              <div className="w-40 h-40 bg-[#F3F4F6] rounded-full animate-pulse" />
            ) : (
              <Doughnut data={pieChartData} options={pieChartOptions} />
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-black rounded-2xl shadow overflow-hidden">
        <h2 className="text-xl font-semibold text-[#111827] px-10 pt-7 pb-4">
          All Transactions
        </h2>

        <div className="bg-white rounded-2xl px-8 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Decision */}
            <div className="relative focus-within:ring-4 focus-within:ring-[#2563EB]/10 focus-within:rounded-xl transition">
              <select
                value={decisionFilter}
                onChange={(e) => setDecisionFilter(e.target.value)}
                className="w-full px-4 pr-10 py-3 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl appearance-none focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition"
              >
                <option value="ALL">All Decisions</option>
                <option value="APPROVE">Approved</option>
                <option value="OTP_REQUIRED">OTP Required</option>
                <option value="BLOCK">Blocked</option>
              </select>

              {/* Custom Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#6B7280]">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Min Risk */}
            <input
              type="number"
              placeholder="Min Risk"
              value={minRisk}
              onChange={(e) => setMinRisk(e.target.value)}
              className="px-4 py-3 bg-[#F8F9FB] border border-[#E5E7EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] rounded-xl"
            />

            {/* Max Risk */}
            <input
              type="number"
              placeholder="Max Risk"
              value={maxRisk}
              onChange={(e) => setMaxRisk(e.target.value)}
              className="px-4 py-3 bg-[#F8F9FB] border border-[#E5E7EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] rounded-xl"
            />

            {/* User Search */}
            <input
              type="text"
              placeholder="Search User ID"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="px-4 py-3 bg-[#F8F9FB] border border-[#E5E7EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] rounded-xl"
            />

          </div>
        </div>

        <div className="mx-8 mb-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#2563EB]/10">
              <tr className="text-center text-[#111827] uppercase text-xs tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Risk</th>
                <th className="px-6 py-4">Decision</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y text-center divide-gray-100">
              {loading
                ? [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-[#F3F4F6] rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
                : paginatedTransactions.map((tx) => {
                    const finalDecision = tx.overridden_decision || tx.decision
                    const isOverridden = !!tx.overridden_decision
                    return (
                      <tr
                        key={tx.id}
                        className="hover:bg-[#F8F9FB] transition-colors"
                      >
                        <td className="px-6 py-4">{tx.id}</td>
                        <td className="px-6 py-4">{tx.user_id}</td>
                        <td className="px-6 py-4 font-medium">
                          ₹{tx.amount}
                        </td>
                        <td className="px-6 py-4">{tx.risk_score}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${isOverridden ? "ring-2 ring-purple-400" : ""
                              } ${finalDecision === "BLOCK"
                                ? "bg-red-100 text-red-600"
                                : finalDecision === "OTP_REQUIRED"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-green-100 text-green-600"
                              }`}
                          >
                            {finalDecision}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {tx.reviewed === "YES" ? (
                            <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">
                              Reviewed
                            </span>
                          ) : (
                            <span className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-500 rounded-full">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedTransaction(tx)}
                            className="px-3 py-1 text-sm bg-[#E0E7FF] text-[#2563EB] rounded-lg hover:bg-[#C7D2FE] transition"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>

          <div className="mt-4 mb-2 px-10 flex items-center justify-between">

            <p className="text-sm text-[#6B7280]">
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center gap-2">

              {/* Go To First */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-600 disabled:opacity-40 hover:bg-[#F3F4F6] transition"
              >
                &laquo;
              </button>

              {/* Previous */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-600 disabled:opacity-40 hover:bg-[#F3F4F6] transition"
              >
                &lsaquo;
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 text-sm rounded-lg transition ${currentPage === page
                      ? "bg-[#2563EB] text-white"
                      : "border border-slate-600 hover:bg-[#F3F4F6]"
                      }`}
                  >
                    {page}
                  </button>
                )
              })}

              {/* Next */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-600 disabled:opacity-40 hover:bg-[#F3F4F6] transition"
              >
                &rsaquo;
              </button>

              {/* Go To Last */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-600 disabled:opacity-40 hover:bg-[#F3F4F6] transition"
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">

          <div className="relative bg-white w-full max-w-md rounded-3xl py-8 px-10 shadow-2xl max-h-[85vh] overflow-y-auto scrollbar-thin thin-scrollbar">

            {/* Close Button */}
            <button
              onClick={() => setSelectedTransaction(null)}
              className="absolute top-7 right-7 w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3F4F6] transition"
            >
              <svg
                className="w-6 h-6 text-[#6B7280]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            <h2 className="text-2xl font-semibold text-[#111827] mb-8">
              Transaction Details
            </h2>

            <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm">

              <span className="text-[#6B7280]">Transaction ID</span>
              <span className="font-medium text-right">{selectedTransaction.id}</span>

              <span className="text-[#6B7280]">User ID</span>
              <span className="font-medium text-right">{selectedTransaction.user_id}</span>

              <span className="text-[#6B7280]">Amount</span>
              <span className="font-medium text-right">₹{selectedTransaction.amount}</span>

              <span className="text-[#6B7280]">Risk Score</span>
              <span className="font-medium text-right">{selectedTransaction.risk_score}</span>

              <span className="text-[#6B7280]">Decision</span>
              <span className="font-medium text-right">{selectedTransaction.decision}</span>

              <span className="text-[#6B7280]">Time</span>
              <span className="font-medium text-right">
                {selectedTransaction.time || "—"}
              </span>

              <span className="text-[#6B7280]">Location</span>
              <span className="font-medium text-right">
                {selectedTransaction.location || "—"}
              </span>

              <span className="text-[#6B7280]">Device</span>
              <span className="font-medium text-right">
                {selectedTransaction.device || "—"}
              </span>
            </div>
            {selectedTransaction.reasons &&
              selectedTransaction.reasons.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-[#111827] mb-3">
                    Fraud Reasons
                  </h3>

                  <div className="space-y-2">
                    {selectedTransaction.reasons.map((reason, index) => (
                      <div
                        key={index}
                        className="text-sm bg-[#FEF3C7] text-[#92400E] px-4 py-2 rounded-xl"
                      >
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            <div className="mt-8 space-y-4">

              <textarea
                placeholder="Add admin remark..."
                value={adminRemark}
                onChange={(e) => setAdminRemark(e.target.value)}
                className="w-full px-4 py-3 bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl"
              />

              <div className="flex gap-3">

                <button
                  disabled={actionLoading}
                  onClick={() => handleAdminAction("APPROVE")}
                  className="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {actionLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                  ) : (
                    "Force Approve"
                  )}
                </button>

                <button
                  disabled={actionLoading}
                  onClick={() => handleAdminAction("BLOCK")}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {actionLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                  ) : (
                    "Force Block"
                  )}
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
      {toast.message && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-2xl shadow-xl text-white transition-all duration-300 ${toast.type === "success"
            ? "bg-[#22C55E]"
            : "bg-[#EF4444]"
            }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}

function Card({ title, value }) {
  return (
    <div className="bg-white border border-black rounded-2xl p-6 shadow">
      <p className="text-sm text-[#6B7280]">{title}</p>
      <p className="text-3xl font-bold text-[#111827]">{value}</p>
    </div>
  )
}

export default AdminPage