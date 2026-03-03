import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
})

axiosInstance.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)

      if (parsedUser?.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user")
      localStorage.removeItem("transactions")

      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

export default axiosInstance