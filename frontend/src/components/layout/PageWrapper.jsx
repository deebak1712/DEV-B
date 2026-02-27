function PageWrapper({ children }) {
  return (
    <div className="flex-1 overflow-auto bg-[#F8F9FB] min-h-screen">
      {children}
    </div>
  )
}

export default PageWrapper