import type { AuthUser } from "@/features/auth/types/auth";

export const ACCESS_TOKEN_STORAGE_KEY = "dawar_access_token";

export function saveAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem("dawar_auth_user");
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function saveAuthUser(user: AuthUser) {
  localStorage.setItem("dawar_auth_user", JSON.stringify(user));
}

export function getAuthUser(): AuthUser | null {
  const stored = localStorage.getItem("dawar_auth_user");
  if (!stored) return null;
  try {
    const user: unknown = JSON.parse(stored);
    if (typeof user === "object" && user !== null && "name" in user && "email" in user && typeof user.name === "string" && typeof user.email === "string") {
      return { name: user.name, email: user.email };
    }
  } catch {
    // A malformed profile must not prevent token initialization.
  }
  return null;
}

// Mock profile lookup until the API supplies the authenticated user's name.
export function getMockProfileName(email: string) {
  return localStorage.getItem("dawar_mock_profile:" + email.trim().toLowerCase());
}
