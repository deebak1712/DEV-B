import axiosInstance from "./axiosInstance"

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

const defaultEmail = "admin@fraudshield.com"
const defaultPassword = "admin123"

export const loginApi = async ({ email, password }) => {
  await delay(500)

  if (email === defaultEmail && password === defaultPassword) {
    return {
      token: "mock-jwt-token-123",
      email,
      role: "admin",
      mode: "demo"
    }
  }

  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password
    })

    return {
      ...response.data,
      mode: "backend"
    }

  } catch (error) {
    throw new Error("Invalid credentials")
  }
}

export const verifyOtpApi = async ({ otp }) => {
  await delay(300)

  if (otp === "123456") {
    return { success: true, mode: "demo" }
  }

  try {
    const response = await axiosInstance.post("/auth/otp", { otp })
    return response.data
  } catch (error) {
    throw new Error("Invalid OTP")
  }
}