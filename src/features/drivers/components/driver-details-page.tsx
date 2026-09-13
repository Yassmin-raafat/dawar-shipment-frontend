"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDriver } from "@/features/drivers/hooks/use-driver";
import { DriverNotFoundError } from "@/services/drivers-api";
import { ActiveShipmentCard, AssignedVehicleCard, RecentDeliveries, ShiftActivity } from "@/features/drivers/components/driver-detail-cards";

export default function DriverDetailsPage({ id }: { id: string }) {
  const { data: driver, isLoading, isError, error, refetch } = useDriver(id);
  const [isAssignShipmentOpen, setIsAssignShipmentOpen] = useState(false);
  const assignDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isAssignShipmentOpen) assignDialog.current?.showModal();
    else assignDialog.current?.close();
  }, [isAssignShipmentOpen]);

  if (isLoading) return <div role="status" aria-label="Loading driver details" className="mx-3 space-y-4">
    <div aria-hidden="true" className="h-24 animate-pulse rounded-2xl bg-secondary" />
    <div aria-hidden="true" className="grid gap-3 lg:grid-cols-[2.1fr_1fr]"><div className="h-[440px] animate-pulse rounded-2xl bg-secondary"/><div className="space-y-3"><div className="h-44 animate-pulse rounded-2xl bg-secondary"/><div className="h-72 animate-pulse rounded-2xl bg-secondary"/></div></div>
  </div>;

  if (isError || !driver) return <section role="alert" className="mx-3 rounded-2xl bg-card px-6 py-12 text-center">
    <h1 className="text-lg font-semibold">{error instanceof DriverNotFoundError ? "Driver not found" : "Could not load driver details"}</h1>
    <p className="mt-2 text-sm text-text-secondary">{error instanceof DriverNotFoundError ? "This driver does not exist or is no longer available." : "Please try again."}</p>
    <div className="mt-5 flex justify-center gap-5 text-sm text-primary"><Link href="/drivers">Back to Drivers</Link>{!(error instanceof DriverNotFoundError) && <button type="button" onClick={() => void refetch()}>Retry</button>}</div>
  </section>;

  return <div className="mx-3 mb-6 space-y-4 text-text-primary">
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-card px-5 py-5">
      <div className="flex min-w-0 items-center gap-3">
        {driver.avatarUrl ? <Image unoptimized src={driver.avatarUrl} alt={driver.name} width={48} height={48} className="size-12 rounded-full object-cover"/> : <div aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-primary-muted text-sm font-semibold text-primary">{driver.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>}
        <div><h1 className="text-[17px] font-semibold tracking-tight">{driver.name}</h1><p className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-[#7387a5]"><span>{driver.role ?? "Fleet Courier"}</span><span aria-hidden="true">•</span><svg aria-hidden="true" className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg><span>{driver.hub || "Hub not assigned"}</span></p></div>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => setIsAssignShipmentOpen(true)} className="inline-flex h-8 items-center gap-2 rounded-xl bg-primary px-3 text-[10px] font-medium text-primary-foreground hover:bg-primary-hover"><svg aria-hidden="true" className="size-3" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M10 3v14M3 10h14"/></svg>Assign Shipment</button>
        <details className="relative"><summary aria-label="Driver options" className="grid size-8 cursor-pointer list-none place-items-center rounded-xl border border-border/60 text-xs text-text-muted [&::-webkit-details-marker]:hidden">···</summary><div className="absolute right-0 top-10 z-10 w-36 rounded-xl border border-border bg-card p-3 text-xs shadow-lg"><Link href="/drivers" className="text-primary">Back to Drivers</Link></div></details>
      </div>
    </section>
    <div className="grid items-start gap-3 lg:grid-cols-[2.1fr_1fr]">
      <div className="min-w-0 rounded-2xl bg-card">
        <div className="flex flex-wrap gap-x-5 gap-y-3 border-b border-border/30 px-5 py-5 text-[10px]">
          <a href={"tel:" + driver.phone.replace(/\s/g, "")} className="inline-flex items-center gap-2"><svg aria-hidden="true" className="size-3.5 text-[#8b9fba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m7 3 3 5-3 2a15 15 0 0 0 7 7l2-3 5 3-1 4C10 22 2 14 3 4l4-1Z"/></svg>{driver.phone}</a>
          <span className="inline-flex items-center gap-2"><svg aria-hidden="true" className="size-3.5 text-[#8b9fba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>{driver.email ? <a href={"mailto:" + driver.email}>{driver.email}</a> : "Email not recorded"}</span>
          <span className="inline-flex items-center gap-2"><svg aria-hidden="true" className="size-3.5 text-[#8b9fba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3h8l4 4v14H6V3Zm8 0v5h4M9 12h6m-6 4h6"/></svg>{driver.licenseClass ?? "License class not recorded"}</span>
        </div>
        <ActiveShipmentCard shipment={driver.activeShipment}/>
        <RecentDeliveries key={id} deliveries={driver.recentDeliveries}/>
      </div>
      <div className="min-w-0 space-y-3"><AssignedVehicleCard driver={driver}/><ShiftActivity activities={driver.shiftActivity}/></div>
    </div>
    <dialog ref={assignDialog} aria-labelledby="assign-shipment-title" onCancel={() => setIsAssignShipmentOpen(false)} className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl backdrop:bg-black/40">
      <h2 id="assign-shipment-title" className="text-base font-semibold">Assign Shipment</h2><p className="mt-3 text-sm text-text-secondary">Shipment assignment is not available yet.</p><button type="button" onClick={() => setIsAssignShipmentOpen(false)} className="mt-5 rounded-lg bg-primary px-4 py-2 text-xs text-primary-foreground">Close</button>
    </dialog>
  </div>;
}
