import { useEffect, useState } from "react"
import { getAnalyticsApi } from "../api/fraudApi"
import KPIcard from "../components/dashboard/KPIcard"
import FraudTrendChart from "../components/dashboard/FraudTrendChart"
import RiskPieChart from "../components/dashboard/RiskPieChart"
import RecentActivity from "../components/dashboard/RecentActivity"

function DashboardPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAnalyticsApi()
        setData(res)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full bg-[#F8F9FB] min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#111827]">Dashboard</h1>
        <p className="text-[#6B7280] mt-1">
          Real-time fraud monitoring and analytics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <KPIcard
          title="Total Transactions"
          value={data?.total_transactions || 0}
          color="blue"
          svg={<svg class="w-6 h-6 text-[#2563EB]/80" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        />
        <KPIcard
          title="Fraud Detected"
          value={data?.fraud_detected || 0}
          color="red"
          svg={<svg class="w-6 h-6 text-[#EF4444]/80" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
        />
        <KPIcard
          title="Medium Risk"
          value={data?.medium_risk || 0}
          color="yellow"
          svg={<svg class="w-6 h-6 text-[#F59E0B]/80" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <KPIcard
          title="Fraud Rate"
          value={`${data?.fraud_rate || 0}%`}
          color="green"
          svg={<svg class="w-6 h-6 text-[#22C55E]/80" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      <div className="bg-white border border-black rounded-2xl p-6 shadow mb-6">
        <FraudTrendChart trendData={data?.trend || []} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-black rounded-2xl p-6 shadow">
          <RiskPieChart riskData={data?.risk_distribution || []} />
        </div>

        <div className="bg-white border border-black rounded-2xl p-6 shadow">
          <RecentActivity activity={data?.recent_activity || []} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage