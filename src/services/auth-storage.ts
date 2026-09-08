export const ACCESS_TOKEN_STORAGE_KEY = "dawar_access_token";

export function saveAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}
