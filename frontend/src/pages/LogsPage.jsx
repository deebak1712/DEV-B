
import { useEffect, useState } from "react"
import { getLogsApi } from "../api/fraudApi"
import LogsTable from "../components/logs/LogsTable"
import LogsFilters from "../components/logs/LogsFilters"

function LogsPage() {
  const [logs, setLogs] = useState([])
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchLogs = async (params = {}) => {
    setLoading(true)
    try {
      const data = await getLogsApi(params)
      setLogs(data?.logs || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    fetchLogs(newFilters)
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full bg-[#F8F9FB] min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#111827]">
          Transaction Logs
        </h1>
        <p className="text-[#6B7280] mt-1">
          View and filter all analyzed transactions
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-black px-3 shadow overflow-hidden">
        <LogsFilters onFilterChange={handleFilterChange} />
        <LogsTable logs={logs} loading={loading} />
      </div>
    </div>
  )
}

export default LogsPage