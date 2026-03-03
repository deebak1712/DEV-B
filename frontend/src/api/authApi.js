import axios from "axios"

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"

export const registerApi = async (data) => {
  const response = await axios.post(`${API_BASE}/register`, data)
  return response.data
}

export const loginApi = async ({ username, password }) => {
  const formData = new URLSearchParams()
  formData.append("username", username)
  formData.append("password", password)

  const response = await axios.post(`${API_BASE}/login`, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })

  return response.data
}