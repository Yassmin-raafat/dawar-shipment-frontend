"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { Driver } from "@/features/drivers/types/driver";
import { useTranslations } from "next-intl";

export default function DriverActions({ driver }: { driver: Driver }) {
  const t = useTranslations("drivers");
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const href = "/drivers/" + encodeURIComponent(driver.id);

  useEffect(() => {
    const close = () => menuRef.current?.hidePopover();
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, []);

  return <>
    <button type="button" aria-label={t("driverActions", { name: driver.name })} popoverTarget={menuId}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPosition({ left: Math.max(8, Math.min(rect.right - 176, window.innerWidth - 184)), top: rect.bottom + 100 > window.innerHeight ? Math.max(8, rect.top - 94) : rect.bottom + 6 });
      }}
      className="inline-flex size-8 items-center justify-center rounded-lg text-text-muted hover:bg-secondary focus-visible:outline-primary">•••</button>
    <div ref={menuRef} id={menuId} popover="auto" style={position} className="fixed m-0 w-44 rounded-xl border border-border bg-card p-1.5 text-left text-xs text-text-primary shadow-lg">
      <Link href={href + "?edit=true"} onClick={() => menuRef.current?.hidePopover()} className="block rounded-lg px-3 py-2.5 hover:bg-secondary focus-visible:outline-primary">{t("viewEdit")}</Link>
      <Link href={href + "?assignShipment=true"} onClick={() => menuRef.current?.hidePopover()} className="block rounded-lg px-3 py-2.5 text-primary hover:bg-primary-muted focus-visible:outline-primary">{t("assign")}</Link>
    </div>
  </>;
}
