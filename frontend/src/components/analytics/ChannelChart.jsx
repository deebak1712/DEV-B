import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

function ChannelChart({ channels }) {
  const labels = channels?.map((c) => c.channel) || []

  const data = {
    labels,
    datasets: [
      {
        label: "Transactions",
        data: channels?.map((c) => c.transactions) || [],
        backgroundColor: "#2563EB",
        borderRadius: 8,
      },
      {
        label: "Fraud Detected",
        data: channels?.map((c) => c.fraud) || [],
        backgroundColor: "#EF4444",
        borderRadius: 8,
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
    <div className="h-72">
      <Bar data={data} options={options} />
    </div>
  )
}

export default ChannelChart