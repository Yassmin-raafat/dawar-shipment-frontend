"use client";

import { useAuthStore } from "@/features/auth/stores/auth-store";
import { logout } from "@/features/auth/services/auth-api";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "./language-switcher";
import { useTranslations } from "next-intl";
import ThemeToggle from "./theme-toggle";
import { useCallback, useRef, useState } from "react";
import useClickOutside from "@/hooks/use-click-outside";

export default function AppHeader() {
  const router = useRouter();
  const t = useTranslations("Header");
  const user = useAuthStore((state) => state.user);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const [openMenu, setOpenMenu] = useState<"notifications" | "profile" | null>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const closeMenus = useCallback(() => setOpenMenu(null), []);
  useClickOutside(notificationsRef, closeMenus);
  useClickOutside(profileRef, closeMenus);

  async function handleLogout() {
    await logout();
    setAuthenticated(false);
    router.replace("/login");
  }

  return (
    <header className="flex h-20 shrink-0 items-center justify-end gap-3 px-5 sm:px-7">
      <LanguageSwitcher />
      <ThemeToggle />
      <div ref={notificationsRef} className="relative">
        <button type="button" aria-expanded={openMenu === "notifications"} aria-label={t("notifications")} onClick={() => setOpenMenu((current) => current === "notifications" ? null : "notifications")} className="grid size-9 cursor-pointer list-none place-items-center rounded-full border border-border/60 bg-card text-text-muted">
          <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4M12 2V0" /></svg>
        </button>
        {openMenu === "notifications" && <div className="absolute end-0 top-12 z-20 w-56 rounded-xl border border-border bg-card p-4 text-xs text-text-secondary shadow-lg">{t("noNotifications")}</div>}
      </div>
      <div ref={profileRef} className="relative">
        <button type="button" aria-expanded={openMenu === "profile"} onClick={() => setOpenMenu((current) => current === "profile" ? null : "profile")} className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-border/60 bg-card py-1 ps-1 pe-3 text-xs text-text-primary">
          <svg aria-hidden="true" className="size-7 rounded-full bg-secondary text-text-muted" fill="currentColor" viewBox="0 0 32 32"><circle cx="16" cy="11" r="7"/><path d="M3 32a13 13 0 0 1 26 0"/></svg>
          <span>{user ? t.rich("welcomeUser", { userName: user.name, name: (name) => <bdi>{name}</bdi> }) : t("welcome")}</span>
          <svg aria-hidden="true" className="ms-1 size-3 text-text-muted" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="m5 7 5 5 5-5"/></svg>
        </button>
        {openMenu === "profile" && <div className="absolute end-0 top-12 z-20 w-40 rounded-xl border border-border bg-card p-1 shadow-lg">
          <button className="w-full rounded-lg px-3 py-2 text-start text-sm text-text-secondary hover:bg-secondary" onClick={handleLogout} type="button">{t("logout")}</button>
        </div>}
      </div>
    </header>
  );
}
