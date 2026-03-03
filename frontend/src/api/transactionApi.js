import axiosInstance from "./axiosInstance"

export const checkTransactionApi = async (payload) => {
  const response = await axiosInstance.post("/check-transaction", payload)
  return response.data
}

export const verifyOtpApi = async (payload) => {
  const response = await axiosInstance.post("/verify-otp", payload)
  return response.data
}