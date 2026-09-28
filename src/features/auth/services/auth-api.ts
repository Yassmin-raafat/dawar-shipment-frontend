import api from "@/lib/axios";
import { getAccessToken, getAuthUser, removeAccessToken, saveAccessToken, saveAuthUser } from "@/features/auth/services/auth-storage";
import type { AdminLoginRequest, AdminLoginResponse, AuthUser } from "@/features/auth/types/auth";

export async function loginAdmin(email: string, password: string): Promise<AdminLoginResponse> {
  const payload: AdminLoginRequest = { email, password };
  const response = (await api.post<AdminLoginResponse>("/api/v1/admins/login", payload)).data;
  saveAccessToken(response.data.accessToken);
  saveAuthUser({ name: email.split("@")[0], email });
  return response;
}

export async function logout() {
  removeAccessToken();
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  return getAccessToken() ? getAuthUser() : null;
}

export const getMe = getCurrentUser;

export function getAuthErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = error.response;
    if (typeof response === "object" && response !== null && "data" in response) {
      const data = response.data;
      if (typeof data === "object" && data !== null && "message" in data && typeof data.message === "string") return data.message;
    }
  }
  if (error instanceof Error && error.message) return error.message;
  return "Unable to complete authentication. Please try again.";
}
