import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
)

function FraudTrendChart({ trendData }) {
  const labels = trendData?.map((item) => item.label) || []

  const data = {
    labels,
    datasets: [
      {
        label: "Transactions",
        data: trendData?.map((item) => item.transactions) || [],
        borderColor: "#2563EB",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: "Fraud Detected",
        data: trendData?.map((item) => item.fraud) || [],
        borderColor: "#EF4444",
        backgroundColor: "transparent",
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
      },
    },
  }

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  )
}

export default FraudTrendChart