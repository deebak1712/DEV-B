export const formatCurrency = (amount) => {
  if (!amount) return "₹0"
  return `₹${Number(amount).toLocaleString()}`
}

export const formatPercentage = (value) => {
  if (!value) return "0%"
  return `${value}%`
}