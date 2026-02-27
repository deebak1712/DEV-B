import { Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

function RiskPieChart({ riskData }) {
  const data = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        data: [
          riskData?.low || 0,
          riskData?.medium || 0,
          riskData?.high || 0,
        ],
        backgroundColor: ["#22C55E", "#F59E0B", "#EF4444"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  }

  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-48 h-48">
        <Doughnut data={data} options={options} />
      </div>
      <div className="ml-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
          <span className="text-sm text-[#6B7280]">Low Risk</span>
          <span className="text-sm font-semibold text-[#111827] ml-auto">
            {riskData?.low || 0}%
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
          <span className="text-sm text-[#6B7280]">Medium Risk</span>
          <span className="text-sm font-semibold text-[#111827] ml-auto">
            {riskData?.medium || 0}%
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
          <span className="text-sm text-[#6B7280]">High Risk</span>
          <span className="text-sm font-semibold text-[#111827] ml-auto">
            {riskData?.high || 0}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default RiskPieChart