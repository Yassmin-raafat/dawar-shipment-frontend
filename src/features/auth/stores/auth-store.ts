import type { AuthUser } from "@/features/auth/types/auth";
import { getCurrentUser } from "@/features/auth/services/auth-api";
import { create } from "zustand";

type AuthStore = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  setAuthenticated: (value: boolean, user?: AuthUser) => void;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,

  setAuthenticated: (value, user) => {
    set({
      isAuthenticated: value,
      user: value ? user ?? null : null,
      isAuthChecked: true,
    });
  },

  checkAuth: async () => {
    const user = await getCurrentUser();
    set({
      isAuthenticated: Boolean(user),
      user,
      isAuthChecked: true,
    });
  },
}));
