import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user")
    if (user) {
      const parsedUser = JSON.parse(user)
      if (parsedUser?.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance