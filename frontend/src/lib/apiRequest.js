import axios from "axios";

// Use environment variable from .env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8800";

const apiRequest = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

export default apiRequest;
