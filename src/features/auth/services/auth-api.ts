import api from "@/lib/axios";
import axios from "axios";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { getAccessToken, getAuthUser, removeAccessToken, saveAccessToken, saveAuthUser } from "@/features/auth/services/auth-storage";
import type { AdminLoginRequest, AdminLoginResponse, AuthUser } from "@/features/auth/types/auth";

export async function loginAdmin(email: string, password: string): Promise<AdminLoginResponse> {
  const payload: AdminLoginRequest = { email, password };
  const response = (await api.post<AdminLoginResponse>("/api/v1/admins/login", payload, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  })).data;
  saveAccessToken(response.data.accessToken);
  saveAuthUser({ name: email.split("@")[0], email });
  return response;
}

export function logout() {
  removeAccessToken();
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  return getAccessToken() ? getAuthUser() : null;
}

export const getMe = getCurrentUser;

export function getAuthErrorMessage(error: unknown) {
  const fallback = "Unable to complete authentication. Please try again.";

  // Authentication failures can be shown, but unexpected server failures stay
  // generic so internal backend details are never exposed on the login screen.
  if (axios.isAxiosError(error) && (error.response?.status ?? 0) >= 500) return fallback;

  return getApiErrorMessage(error, fallback);
}
