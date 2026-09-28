import axios from "axios";
import { getAccessToken, removeAccessToken } from "@/features/auth/services/auth-storage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(undefined, (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    removeAccessToken();
    if (typeof window !== "undefined") window.dispatchEvent(new Event("auth:unauthorized"));
  }
  return Promise.reject(error);
});

export default api;
