import axiosInstance from "./axiosInstance"

export const getAdminTransactions = async () => {
  const response = await axiosInstance.get("/admin/transactions")
  return response.data
}

export const getAdminAnalytics = async () => {
  const response = await axiosInstance.get("/admin/analytics")
  return response.data
}