function RecentActivity({ activity }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[#111827] mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activity?.length === 0 && (
          <p className="text-sm text-[#6B7280]">No recent activity</p>
        )}

        {activity?.map((item, index) => (
          <div
            key={index}
            className="flex items-center border border-black gap-4 p-3 rounded-xl hover:bg-gray-300 transition-all duration-200 hover:-translate-y-[5px]"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                item.decision === "Blocked"
                  ? "bg-[#EF4444]"
                  : item.decision === "Step-Up"
                  ? "bg-[#F59E0B]"
                  : "bg-[#22C55E]"
              }`}
            >
              {item.decision === "Blocked" && "✕"}
              {item.decision === "Step-Up" && "!"}
              {item.decision === "Approved" && "✓"}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#111827] truncate">
                {item.message}
              </p>
              <p className="text-xs text-[#6B7280]">
                Risk Score: {item.risk_score}
              </p>
            </div>

            <span className="text-xs text-[#6B7280] flex-shrink-0">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity