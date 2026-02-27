import { useState } from "react"

function AccordionSection({ title, data }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center justify-between bg-[#F8F9FB] hover:bg-gray-100 transition"
      >
        <span className="text-sm font-medium text-[#111827]">
          {title}
        </span>
        <svg
          className={`w-5 h-5 text-[#6B7280] transform transition ${
            open ? "rotate-180" : ""
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

      {open && (
        <div className="px-5 py-4 bg-white border-t border-gray-100">
          <div className="space-y-3 text-sm">
            {data &&
              Object.entries(data).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-[#6B7280]">
                    {key}
                  </span>
                  <span className="font-medium text-[#111827]">
                    {String(value)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AccordionSection