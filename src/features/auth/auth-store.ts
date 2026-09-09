import { getAccessToken } from "@/services/auth-storage";
import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  setAuthenticated: (value: boolean) => void;
  checkAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isAuthChecked: false,

  setAuthenticated: (value) => {
    set({
      isAuthenticated: value,
      isAuthChecked: true,
    });
  },

  checkAuth: () => {
    const token = getAccessToken();

    set({
      isAuthenticated: Boolean(token),
      isAuthChecked: true,
    });
  },
}));