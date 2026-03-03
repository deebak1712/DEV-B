import { useEffect, useState } from "react"

function ResultModal({ result, onClose }) {
  const [score, setScore] = useState(0)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      if (current >= result.final_risk_score) {
        clearInterval(interval)
      } else {
        current++
        setScore(current)
      }
    }, 10)
    return () => clearInterval(interval)
  }, [result])

  const decisionColor =
    result.decision === "BLOCK"
      ? "#EF4444"
      : result.decision === "OTP_REQUIRED"
      ? "#F59E0B"
      : "#22C55E"

  const decisionLabel =
    result.decision === "BLOCK"
      ? "Blocked"
      : result.decision === "OTP_REQUIRED"
      ? "OTP Required"
      : "Approved"

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="rounded-3xl p-8 w-full max-w-md shadow-xl bg-white border border-black"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-[#111827]">
            Transaction Result
          </h2>
          <p className="text-sm text-[#6B7280] mt-1">
            Fraud risk analysis completed
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold"
            style={{
              border: `6px solid ${decisionColor}`,
              color: decisionColor,
            }}
          >
            {score}
          </div>
        </div>

        <div className="text-center mb-4">
          <span
            className="px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: decisionColor + "20",
              color: decisionColor,
            }}
          >
            {decisionLabel}
          </span>
        </div>

        <div className="mb-6 text-sm text-[#6B7280] space-y-2">
          <p>Rule Score: {result.rule_score}</p>
          <p>Behaviour Score: {result.behaviour_score}</p>
          <p>Context Score: {result.context_score}</p>

          {result.reasons?.length > 0 && (
            <div className="mt-2">
              <p className="font-medium text-[#111827]">Reasons:</p>
              {result.reasons.map((reason, index) => (
                <p key={index}>• {reason}</p>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ResultModal