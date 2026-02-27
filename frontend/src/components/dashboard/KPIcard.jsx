function KPIcard({ title, value, color, svg }) {
  const colorMap = {
    blue: "bg-blue-50 border border-[#2563EB]/50",
    red: "bg-red-50 border border-[#EF4444]/50",
    yellow: "bg-yellow-50 border border-[#F59E0B]/50",
    green: "bg-green-50 border border-[#22C55E]/50",
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-black">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#6B7280] text-sm font-medium">{title}</span>

        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}
        >
          {svg}
        </div>
      </div>

      <p className="text-3xl font-bold text-[#111827]">{value}</p>
    </div>
  )
}

export default KPIcard