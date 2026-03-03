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
  Filler,
} from "chart.js"

import { useTransactions } from "../context/TransactionContext"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
)

function DashboardPage() {
  const { transactions } = useTransactions()

  const total = transactions.length
  const approved = transactions.filter(t => t.decision === "APPROVE").length
  const blocked = transactions.filter(t => t.decision === "BLOCK").length
  const otp = transactions.filter(t => t.decision === "OTP_REQUIRED").length

  const lineData = {
    labels: transactions.map((_, i) => `T${i + 1}`),
    datasets: [
      {
        label: "Risk Score",
        data: transactions.map(t => t.final_risk_score),
        borderColor: "#2563EB",
        backgroundColor: "rgba(37,99,235,0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: "High Risk Threshold",
        data: transactions.map(() => 70),
        borderColor: "#EF4444",
        borderDash: [6, 6],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
  }

  const pieData = {
    labels: ["Approved", "OTP Required", "Blocked"],
    datasets: [
      {
        data: [approved, otp, blocked],
        backgroundColor: ["#22C55E", "#F59E0B", "#EF4444"],
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#111827]">Dashboard</h1>
        <p className="text-[#6B7280] mt-1">
          Real-time fraud monitoring and analytics
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card title="Total Transactions" value={total} />
        <Card title="Approved" value={approved} />
        <Card title="Blocked" value={blocked} />
        <Card title="OTP Required" value={otp} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white border border-black rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">
            Risk Trend
          </h2>
          {transactions.length === 0 ? (
            <EmptyState message="No transaction data yet" />
          ) : (
            <Line data={lineData} options={{
              maintainAspectRatio: false,
              responsive: true,
              animation: {
                duration: 1200,
                easing: "easeOutQuart",
              },
              transitions: {
                show: {
                  animations: {
                    x: { from: 0 },
                    y: { from: 0 },
                  },
                },
              },
              plugins: {
                legend: { position: "top", align: "end" },
              },
              scales: {
                y: {
                  min: 0,
                  max: 100,
                },
              },
            }} />
          )}
        </div>

        <div className="bg-white border border-black rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">
            Decision Distribution
          </h2>
          {transactions.length === 0 ? (
            <EmptyState message="No transaction data yet" />
          ) : (
            <Doughnut data={pieData} options={{
              maintainAspectRatio: false,
              responsive: true,
              animation: {
                animateRotate: true,
                duration: 1000,
                easing: "easeOutQuart",
              },
              plugins: {
                legend: { position: "top", align: "end" },
              },
            }} />
          )}
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white border border-black rounded-2xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">
          Recent Activity
        </h2>

        {transactions.length === 0 && (
          <p className="text-sm text-[#6B7280]">
            No transactions yet
          </p>
        )}

        <div className="space-y-4">
          {transactions.slice(0, 5).map((t, index) => (
            <div
              key={index}
              className="flex justify-between items-center border border-gray-100 p-3 rounded-xl"
            >
              <span className="text-sm text-[#111827]">
                Risk: {t.final_risk_score}
              </span>

              <span
                className={`text-sm font-medium ${t.decision === "BLOCK"
                  ? "text-[#EF4444]"
                  : t.decision === "OTP_REQUIRED"
                    ? "text-[#F59E0B]"
                    : "text-[#22C55E]"
                  }`}
              >
                {t.decision}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Card({ title, value }) {
  return (
    <div className="bg-white border border-black rounded-2xl p-6 shadow">
      <p className="text-sm text-[#6B7280] mb-2">{title}</p>
      <p className="text-3xl font-bold text-[#111827]">{value}</p>
    </div>
  )
}

export default DashboardPage

function EmptyState({ message }) {
  return (
    <div className="h-64 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-[#EEF2FF] rounded-2xl flex items-center justify-center mb-4">
        <svg
          className="w-7 h-7 text-[#2563EB]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 19V5m4 14V9m4 10V13m4 6V7"
          />
        </svg>
      </div>

      <p className="text-sm text-[#6B7280]">
        {message}
      </p>
    </div>
  )
}