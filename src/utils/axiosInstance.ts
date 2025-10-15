import axios from "axios";

const baseURL = import.meta.env.VITE_ENV === 'development' ? "/api" : import.meta.env.VITE_API_URL;


const axiosInstance = axios.create({
  // baseURL: import.meta.env.DEV ? "/api" : "http://localhost:5000",
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.status === 403) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
)


export default axiosInstance;
