"use client";

import { useTranslations } from "next-intl";

import Image from "next/image";
import { useState } from "react";
import type { Driver, DriverDelivery, DriverShipment } from "@/features/drivers/types/driver";

export function ActiveShipmentCard({ shipment }: { shipment?: DriverShipment }) {
  const t = useTranslations("driverDetails");
  return <section className="border-b border-border/30 px-5 py-6">
    <h2 className="text-xs font-semibold">{t("activeShipment")}</h2>
    {shipment ? <>
      <dl className="mt-4 grid grid-cols-2 gap-4 border-y border-border/30 py-4 sm:grid-cols-4">
        <div><dt className="text-[10px] text-[#8b9fba]">{t("recipient")}</dt><dd className="mt-1 text-xs font-medium">{shipment.recipient}</dd></div>
        <div><dt className="text-[10px] text-[#8b9fba]">{t("origin")}</dt><dd className="mt-1 text-xs font-medium">{shipment.origin}</dd></div>
        <div><dt className="text-[10px] text-[#8b9fba]">{t("destination")}</dt><dd className="mt-1 text-xs font-medium">{shipment.destination}</dd></div>
        <div><dt className="text-[10px] text-[#8b9fba]">{t("fee")}</dt><dd className="mt-1 text-xs font-semibold text-primary">{t("amount", { amount: shipment.fee })}</dd></div>
      </dl>
      <div className="mt-4 flex justify-between gap-4 text-[10px] text-[#7387a5]"><span>{shipment.origin}</span><span className="text-end">{shipment.destination}</span></div>
      <div role="progressbar" aria-label={t("routeProgress")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={shipment.progress} className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#f1f5f9]"><div className="h-full rounded-full bg-primary" style={{ width: Math.max(0, Math.min(100, shipment.progress)) + "%" }} /></div>
    </> : <p className="py-8 text-xs text-text-secondary">{t("noActiveShipment")}</p>}
  </section>;
}

export function RecentDeliveries({ deliveries = [] }: { deliveries?: DriverDelivery[] }) {
  const t = useTranslations("driverDetails");
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? deliveries : deliveries.slice(0, 3);
  return <section className="px-5 py-6">
    <div className="flex items-center justify-between gap-4"><h2 className="text-xs font-semibold">{t("recentDeliveries")}</h2>{deliveries.length > 3 && <button type="button" onClick={() => setShowAll(!showAll)} className="text-[10px] text-primary hover:underline">{showAll ? t("showLess") : t("viewAll")}</button>}</div>
    {deliveries.length ? <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[480px] text-start text-[10px]">
      <thead className="text-[#8b9fba]"><tr>{[t("orderId"), t("route"), t("fee"), t("status")].map((label) => <th scope="col" key={label} className="border-b border-border/30 px-2 py-3 font-normal">{label}</th>)}</tr></thead>
      <tbody>{visible.map((delivery) => <tr key={delivery.id} className="border-b border-border/30 last:border-0"><td className="px-2 py-3 whitespace-nowrap">#{delivery.id}</td><td className="px-2 py-3 text-[#52647e]">{delivery.origin} → {delivery.destination}</td><td className="px-2 py-3 whitespace-nowrap">{t("amount", { amount: delivery.fee })}</td><td className="px-2 py-3"><span className={delivery.status === "Delivered" ? "rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-600" : "rounded-full bg-amber-50 px-2 py-0.5 text-amber-700"}>{t(delivery.status)}</span></td></tr>)}</tbody>
    </table></div> : <p className="py-8 text-xs text-text-secondary">{t("noDeliveries")}</p>}
  </section>;
}

export function AssignedVehicleCard({ driver }: { driver: Driver }) {
  const t = useTranslations("driverDetails");
  return <section className="rounded-2xl bg-card p-5">
    <h2 className="text-xs font-semibold">{t("assignedVehicle")}</h2>
    <div className="mt-5 flex min-h-12 items-center justify-between gap-4"><div><p className="text-[10px] text-primary">{driver.vehicleColor ? (t.has(driver.vehicleColor) ? t(driver.vehicleColor) : driver.vehicleColor) : t("colorMissing")}</p><p className="mt-1 text-xs font-semibold">{driver.vehicle}</p></div>{driver.vehiclePhotoUrl && <Image unoptimized src={driver.vehiclePhotoUrl} alt={driver.vehicle} width={100} height={60} className="h-16 w-24 object-contain" />}</div>
    <dl className="mt-4 flex items-center justify-between gap-3 border-t border-border/40 pt-5 text-[10px]"><dt className="text-[#7387a5]">{t("licensePlate")}</dt><dd>{driver.plateNumber ?? t("notRecorded")}</dd></dl>
  </section>;
}

export function ShiftActivity({ activities = [] }: { activities?: Driver["shiftActivity"] }) {
  const t = useTranslations("driverDetails");
  return <section className="rounded-2xl bg-card p-5">
    <div className="flex items-center justify-between"><h2 className="text-xs font-semibold">{t("shiftActivity")}</h2><span className="text-[10px] text-[#8b9fba]">{t("today")}</span></div>
    {activities.length ? <ol className="mt-2 divide-y divide-border/30">{activities.map((entry) => <li key={entry.id} className="flex justify-between gap-3 py-2.5 text-[10px]"><div><p>{t.has(entry.activity) ? t(entry.activity) : entry.activity}</p><p className="mt-0.5 text-[#8b9fba]">{entry.location === "Inspection Completed" ? t("Inspection Completed") : entry.location}</p></div><span className="shrink-0 text-[9px] text-[#8b9fba]">{entry.time}</span></li>)}</ol> : <p className="py-8 text-xs text-text-secondary">{t("noActivity")}</p>}
  </section>;
}
