import axios from "axios";
import { getAccessToken, removeAccessToken } from "@/features/auth/services/auth-storage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const requestPath = config.url ?? "";
  const isPublicAuthRequest = requestPath === "/api/v1/admins/login" || requestPath === "/api/backend/api/v1/admins/login";
  const token = getAccessToken();
  if (token && !isPublicAuthRequest) config.headers.Authorization = `Bearer ${token}`;
  if (isPublicAuthRequest) delete config.headers.Authorization;
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
