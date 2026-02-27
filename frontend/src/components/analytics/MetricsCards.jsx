function MetricsCards({ metrics }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="bg-white border border-black rounded-2xl p-6 shadow">
        <h3 className="text-sm font-medium text-[#6B7280] mb-4">
          Detection Accuracy
        </h3>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-[#111827]">
            {metrics?.accuracy || 0}%
          </span>
        </div>
        <div className="mt-4 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#22C55E]"
            style={{ width: `${metrics?.accuracy || 0}%` }}
          />
        </div>
      </div>

      <div className="bg-white border border-black rounded-2xl p-6 shadow">
        <h3 className="text-sm font-medium text-[#6B7280] mb-4">
          False Positive Rate
        </h3>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-[#111827]">
            {metrics?.false_positive || 0}%
          </span>
        </div>
        <div className="mt-4 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2563EB]"
            style={{ width: `${metrics?.false_positive || 0}%` }}
          />
        </div>
      </div>

      <div className="bg-white border border-black rounded-2xl p-6 shadow">
        <h3 className="text-sm font-medium text-[#6B7280] mb-4">
          Avg. Response Time
        </h3>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-[#111827]">
            {metrics?.response_time || 0}ms
          </span>
        </div>
        <div className="mt-4 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#8B5CF6]"
            style={{ width: "50%" }}
          />
        </div>
      </div>
    </div>
  )
}

export default MetricsCards