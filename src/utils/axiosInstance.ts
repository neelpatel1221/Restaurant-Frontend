import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? "/" : "http://localhost:5000",
});
console.log(axiosInstance.defaults.baseURL);


export default axiosInstance;
