import axios from "axios";
const { VITE_BASE_API_URL } = import.meta.env;


const apiClient = axios.create({
  baseURL: VITE_BASE_API_URL || "http://localhost:5000/api", // Use environment variable or default to localhost
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token from localStorage to requests if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
