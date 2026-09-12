import type { AuthUser } from "@/features/auth/types/auth";
import { getAccessToken, getAuthUser } from "@/features/auth/services/auth-storage";
import { create } from "zustand";

type AuthStore = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  setAuthenticated: (value: boolean, user?: AuthUser) => void;
  checkAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,

  setAuthenticated: (value, user) => {
    set({
      isAuthenticated: value,
      user: value ? user ?? getAuthUser() : null,
      isAuthChecked: true,
    });
  },

  checkAuth: () => {
    const token = getAccessToken();

    set({
      isAuthenticated: Boolean(token),
      user: token ? getAuthUser() : null,
      isAuthChecked: true,
    });
  },
}));