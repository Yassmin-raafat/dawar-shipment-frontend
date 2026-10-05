"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { disconnectMessagesSocket } from "@/features/messages/services/messages-socket";

export default function AuthInitializer() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleUnauthorized = () => {
      disconnectMessagesSocket();
      useAuthStore.getState().setAuthenticated(false);
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  return null;
}
