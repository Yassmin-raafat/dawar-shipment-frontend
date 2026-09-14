"use client";

import { useAuthStore } from "@/features/auth/stores/auth-store";
import { logout } from "@/features/auth/services/auth-api";
import { useRouter } from "next/navigation";

export default function AppHeader() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  async function handleLogout() {
    await logout();
    setAuthenticated(false);
    router.replace("/login");
  }

  return (
    <header className="flex h-20 shrink-0 items-center justify-end gap-3 px-5 sm:px-7">
      <details className="relative">
        <summary aria-label="Notifications" className="grid size-9 cursor-pointer list-none place-items-center rounded-full border border-border/60 bg-card text-text-muted [&::-webkit-details-marker]:hidden">
          <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4M12 2V0" /></svg>
        </summary>
        <div className="absolute right-0 top-12 z-20 w-56 rounded-xl border border-border bg-card p-4 text-xs text-text-secondary shadow-lg">No notifications yet.</div>
      </details>
      <details className="relative">
        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-border/60 bg-card py-1 pl-1 pr-3 text-xs text-text-primary [&::-webkit-details-marker]:hidden">
          <svg aria-hidden="true" className="size-7 rounded-full bg-secondary text-text-muted" fill="currentColor" viewBox="0 0 32 32"><circle cx="16" cy="11" r="7"/><path d="M3 32a13 13 0 0 1 26 0"/></svg>
          <span>Welcome{user ? ", " + user.name : ""}</span>
          <svg aria-hidden="true" className="ml-1 size-3 text-text-muted" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="m5 7 5 5 5-5"/></svg>
        </summary>
        <div className="absolute right-0 top-12 z-20 w-40 rounded-xl border border-border bg-card p-1 shadow-lg">
          <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-text-secondary hover:bg-secondary" onClick={handleLogout} type="button">Logout</button>
        </div>
      </details>
    </header>
  );
}
