import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE==="devlopement" ? "http://localhost:5001/api":"/api ",
  withCredentials: true,
});
