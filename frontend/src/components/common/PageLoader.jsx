import { useEffect, useState } from "react"

function PageLoader() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 1000) // ⬅ Increase this value if you want more delay

    return () => clearTimeout(timer)
  }, [])

  if (!visible) {
    return (
      <div className="h-screen bg-[#F8F9FB]" />
    )
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#F8F9FB]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-[#6B7280]">Loading...</p>
      </div>
    </div>
  )
}

export default PageLoader