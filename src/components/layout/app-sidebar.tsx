"use client";

import { usePathname } from "next/navigation";
import DawarLogo from "@/components/ui/dawar-logo";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AppSidebar() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const navigationItems = [
    {
      href: "/orders",
      label: t("orders"),
    },
    {
      href: "/drivers",
      label: t("drivers"),
    },
    {
      href: "/messages",
      label: t("messages"),
    },
  ];

  return (
    <aside className="hidden min-h-0 w-60 shrink-0 overflow-y-auto bg-sidebar px-5 py-10 lg:block">
      <div className="px-3 [&_img]:h-auto [&_img]:w-28"><DawarLogo /></div>

      <nav className="mt-12 space-y-1" aria-label={t("mainNavigation")}>
        {navigationItems.map((item) => (
          <Link
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-medium transition ${
              (pathname === item.href || pathname.startsWith(`${item.href}/`))
                ? "bg-primary-muted text-primary"
                : "text-sidebar-foreground hover:bg-secondary hover:text-text-primary"
            }`}
            aria-current={pathname === item.href ? "page" : undefined}
            href={item.href}
            key={item.href}
          >
            <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {item.href === "/orders" ? <path d="m12 3 8 4v10l-8 4-8-4V7l8-4Zm0 9 8-5M12 12 4 7m8 5v9M8 5l8 4" /> : item.href === "/drivers" ? <><circle cx="10" cy="6" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m2-9 2 2 3-4"/></> : <path d="M4 4h16v13H9l-5 4V4Z" />}
            </svg>
            {item.label}
            {item.href === "/messages" && <span aria-label={t("newMessages", { count: 4 })} className="ms-auto grid size-4 place-items-center rounded-full bg-primary text-[9px] font-medium text-primary-foreground">4</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
