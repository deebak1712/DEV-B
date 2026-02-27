export const getRiskColor = (score) => {
  if (score >= 70) return "red"
  if (score >= 40) return "yellow"
  return "green"
}

export const getDecisionLabel = (score) => {
  if (score >= 70) return "Blocked"
  if (score >= 40) return "Step-Up"
  return "Approved"
}