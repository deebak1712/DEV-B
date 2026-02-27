import { useEffect, useState } from "react"
import { getAnalyticsApi } from "../api/fraudApi"
import MetricsCards from "../components/analytics/MetricsCards"
import ChannelChart from "../components/analytics/ChannelChart"

function AnalyticsPage() {
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
        <h1 className="text-2xl font-semibold text-[#111827]">
          Analytics
        </h1>
        <p className="text-[#6B7280] mt-1">
          Deep insights into fraud patterns and system performance
        </p>
      </div>

      <MetricsCards metrics={data?.metrics || {}} />

      <div className="bg-white border border-black rounded-2xl p-6 shadow mt-6">
        <ChannelChart channels={data?.channels || []} />
      </div>
    </div>
  )
}

export default AnalyticsPage