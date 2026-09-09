"use client";

import { useAuthStore } from "@/features/auth/auth-store";
import { logout } from "@/services/auth-api";
import { useRouter } from "next/navigation";

export default function AppHeader() {
  const router = useRouter();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  async function handleLogout() {
    await logout();
    setAuthenticated(false);
    router.replace("/login");
  }

  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-card px-5 sm:px-8">
      <div>
        <p className="text-[12px] font-medium uppercase text-text-secondary">
          Dawar Portal
        </p>
        <h1 className="mt-1 text-[22px] font-bold text-text-primary">
          Drivers
        </h1>
      </div>

      <button
        className="rounded-[8px] border border-border px-4 py-2 text-[13px] font-semibold text-text-secondary transition hover:border-border-strong hover:text-text-primary"
        onClick={handleLogout}
        type="button"
      >
        Logout
      </button>
    </header>
  );
}
