"use client";

import { useTranslations } from "next-intl";
import type { Order, ShipmentStatus } from "@/features/orders/types/order";
import type { AdminUserLookup } from "@/services/shipments-api";
import type { DriverListItem } from "@/features/drivers/types/driver";

export default function OrderCard({ order, recipient, driver, selected, onSelect, labels }: { order: Order; recipient: AdminUserLookup | null; driver: DriverListItem | null; selected: boolean; onSelect: () => void; labels: Record<ShipmentStatus, string> }) {
  const t = useTranslations("orders");
  const date = (value: string | null) => value ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value)) : "—";
  const progress = order.status === "DELIVERED" ? 100 : order.status === "ON_THE_WAY" ? 65 : order.status === "ASSIGNED" ? 30 : 10;
  const driverName = driver?.name ?? (order.driverId ? t("driverUnavailable") : t("noDriverAssigned"));
  const driverInitials = driver?.name.split(" ").map((part) => part[0]).join("").slice(0, 2) ?? "—";

  return <button type="button" onClick={onSelect} aria-pressed={selected} className={`w-full rounded-2xl border p-3 text-start transition ${selected ? "border-primary bg-primary-muted/50" : "border-border/40 bg-card hover:bg-secondary"}`}><div className="flex items-start justify-between gap-2"><span className="flex min-w-0 items-center gap-2 text-[11px] font-semibold text-text-primary"><span className="grid size-6 shrink-0 place-items-center rounded-lg bg-primary-muted text-primary">⌁</span><span className="truncate">{order.orderNumber}</span></span><span className="shrink-0 rounded-full bg-secondary px-2 py-1 text-[8px] font-medium text-text-secondary">{labels[order.status]}</span></div><div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-start gap-2 text-[9px]"><div className="min-w-0"><p className="truncate font-medium">{order.pickupAddress}</p><p className="mt-1 text-text-secondary">{date(order.pickedUpAt)}</p></div><div className="pt-1 text-text-muted">→</div><div className="min-w-0 text-end"><p className="truncate font-medium">{order.deliveryAddress}</p><p className="mt-1 text-text-secondary">{date(order.deliveredAt)}</p></div></div><div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} /></div><div className="mt-3 flex items-center gap-2 text-[9px] text-text-secondary"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-muted text-[8px] font-semibold text-primary">{driverInitials}</span><span className="min-w-0 flex-1 truncate"><b className="font-medium text-text-primary">{driverName}</b>{driver && <span className="ms-1">{driver.vehicleBrand} · {driver.vehicleType}</span>}</span><span aria-label={recipient?.phoneNumber ?? t("recipientUnavailable")} className="grid size-6 place-items-center rounded-lg border border-border/50 text-text-muted">⌕</span></div></button>;
}
