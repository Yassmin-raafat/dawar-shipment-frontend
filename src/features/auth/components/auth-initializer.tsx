"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/stores/auth-store";

export default function AuthInitializer() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleUnauthorized = () => useAuthStore.getState().setAuthenticated(false);
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  return null;
}
