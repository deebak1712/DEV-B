import { useEffect, useState } from "react"

function ResultModal({ result, onClose }) {
  const [score, setScore] = useState(0)
  const [openSection, setOpenSection] = useState(null)

  useEffect(() => {
    let current = 0
    const target = result?.risk_score || 0
    const interval = setInterval(() => {
      if (current >= target) {
        clearInterval(interval)
      } else {
        current++
        setScore(current)
      }
    }, 10)
    return () => clearInterval(interval)
  }, [result])

  const decisionColor =
    result?.decision === "Blocked"
      ? "#EF4444"
      : result?.decision === "Step-Up"
      ? "#F59E0B"
      : "#22C55E"

  const circumference = 2 * Math.PI * 70
  const offset = circumference - (score / 100) * circumference

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  const renderSection = (title, data, key) => (
    <div
      style={{
        border: "1px solid rgba(37, 99, 235, 0.15)",
        borderRadius: "0.75rem",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => toggleSection(key)}
        className="w-full px-5 py-4 flex items-center justify-between transition-colors"
        style={{
          background:
            "linear-gradient(135deg, rgba(248, 249, 251, 0.8) 0%, rgba(248, 249, 251, 0.4) 100%)",
        }}
      >
        <span className="text-sm font-medium text-[#111827]">
          {title}
        </span>
        <svg
          className={`w-5 h-5 text-[#6B7280] transform transition-transform ${
            openSection === key ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {openSection === key && (
        <div
          className="px-5 py-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(248, 249, 251, 0.3) 100%)",
            borderTop: "1px solid rgba(37, 99, 235, 0.1)",
          }}
        >
          <div className="space-y-3 text-sm">
            {Object.entries(data || {}).map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-[#6B7280]">{k}</span>
                <span
                  className={`font-medium ${
                    v === "Passed" || v === "Clear" || v === "Normal"
                      ? "text-[#22C55E]"
                      : v === "Failed"
                      ? "text-[#EF4444]"
                      : "text-[#111827]"
                  }`}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="rounded-3xl p-8 w-full max-w-lg deep-shadow"
        style={{
          background: "#FFFFFF",
          border: "1px solid #000000",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-[#111827]">
            Analysis Complete
          </h2>
          <p className="text-sm text-[#6B7280] mt-1">
            Transaction risk assessment results
          </p>
        </div>

        {/* SCORE CIRCLE */}
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke={decisionColor}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#111827]">
                {score}
              </span>
              <span className="text-sm text-[#6B7280]">
                Risk Score
              </span>
            </div>
          </div>
        </div>

        {/* DECISION BADGE */}
        <div className="flex justify-center mb-8">
          <span
            className="px-6 py-2.5 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: decisionColor + "20",
              color: decisionColor,
            }}
          >
            {result?.decision}
          </span>
        </div>

        {/* ACCORDION SECTIONS */}
        <div className="space-y-3 mb-6">
          {renderSection(
            "Rule Based Layer Analysis",
            result?.rule_layer,
            "rule"
          )}
          {renderSection(
            "AI Behaviour Analysis",
            result?.ai_layer,
            "ai"
          )}
          {renderSection(
            "Contextual Risk Analysis",
            result?.context_layer,
            "context"
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 text-[#111827] font-medium rounded-xl transition-colors"
          style={{
            background:
              "linear-gradient(135deg, rgba(248, 249, 251, 0.8) 0%, rgba(248, 249, 251, 0.4) 100%)",
            border: "1px solid rgba(37, 99, 235, 0.12)",
          }}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ResultModal