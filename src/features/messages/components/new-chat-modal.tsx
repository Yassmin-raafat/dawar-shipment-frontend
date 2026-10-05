"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import useDebounce from "@/hooks/use-debounce";
import { useDrivers } from "@/features/drivers/hooks/use-drivers";
import type { DriverListItem } from "@/features/drivers/types/driver";

export default function NewChatModal({ currentAdminUserId, onClose, onSelect }: { currentAdminUserId: string | null; onClose: () => void; onSelect: (driver: DriverListItem) => void }) {
  const t = useTranslations("messages"); const [search, setSearch] = useState(""); const term = useDebounce(search);
  const query = useDrivers({ page: 1, size: 100, search: term.trim() || undefined, status: "ACTIVE" }); const drivers = (query.data?.data ?? []).filter((driver) => !currentAdminUserId || driver.userId !== currentAdminUserId);
  return <dialog open aria-labelledby="new-chat-title" className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-border/30 bg-card p-5 text-text-primary shadow-xl backdrop:bg-black/30"><div><h2 id="new-chat-title" className="text-sm font-semibold">{t("newChat")}</h2><p className="mt-1 text-xs text-text-secondary">{t("selectUser")}</p><input autoFocus type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("searchUsers")} className="mt-4 h-9 w-full rounded-xl border border-border/30 bg-secondary px-3 text-xs outline-none focus:border-primary" /><div className="mt-3 max-h-64 overflow-y-auto">{query.isLoading ? <p className="py-6 text-center text-xs text-text-secondary">{t("loadingUsers")}</p> : drivers.map((driver) => <button key={driver.id} type="button" onClick={() => onSelect(driver)} className="flex w-full items-center gap-3 rounded-xl p-3 text-start hover:bg-secondary"><span className="grid size-9 place-items-center rounded-full bg-primary-muted text-xs font-semibold text-primary">{driver.name.split(" ").map((part) => part[0]).join("")}</span><span><span className="block text-xs font-medium">{driver.name}</span><span className="block text-[10px] text-text-secondary">{driver.vehicleBrand} · {driver.vehicleType}</span></span></button>)}</div><div className="mt-5 flex justify-end"><button type="button" onClick={onClose} className="rounded-xl border border-border/40 px-4 py-2 text-xs">{t("cancel")}</button></div></div></dialog>;
}
