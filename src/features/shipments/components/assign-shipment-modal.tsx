"use client";

import { useAssignmentError } from "@/features/shipments/hooks/use-assignment-error";
import { useTranslations } from "next-intl";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAvailableShipments } from "@/features/shipments/hooks/use-available-shipments";
import { useAssignShipment } from "@/features/shipments/hooks/use-assign-shipment";
import type { Shipment } from "@/features/shipments/types/shipment";

export default function AssignShipmentModal({ driverId, driverName, onClose, onSuccess }: {
  driverId: string; driverName: string; onClose: () => void; onSuccess: (shipment: Shipment) => void;
}) {
  const t = useTranslations("shipmentAssignment");
  const translateError = useAssignmentError();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const submitting = useRef(false);
  const [search, setSearch] = useState("");
  const [hub, setHub] = useState("Cairo Hub 4");
  const [status, setStatus] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState<Shipment>();
  const query = useAvailableShipments();
  const mutation = useAssignShipment();
  const shipments = query.data ?? [];
  const term = search.trim().toLowerCase().replace(/^#/, "");
  const hubs = Array.from(new Set([hub, ...shipments.map((shipment) => shipment.origin)])).filter(Boolean);
  const visible = shipments.filter((shipment) => (!hub || shipment.origin === hub)
    && (!status || shipment.status === status)
    && [shipment.id, shipment.recipient, shipment.origin, shipment.destination].some((value) => value.toLowerCase().includes(term)));

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || submitting.current || mutation.isPending) return;
    submitting.current = true;
    try {
      const shipment = await mutation.mutateAsync({ shipmentId: selected.id, driverId });
      onSuccess(shipment);
      onClose();
    } catch {
      // Keep selection and modal open; the mutation exposes the inline error.
    } finally { submitting.current = false; }
  }

  return <dialog ref={dialogRef} aria-labelledby="assign-shipment-title" aria-describedby="assign-shipment-description"
    onCancel={(event) => { event.preventDefault(); if (!submitting.current) onClose(); }}
    className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-32px)] max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card p-0 text-text-primary shadow-xl backdrop:bg-black/40">
    <form onSubmit={submit} aria-busy={mutation.isPending}>
      <header className="flex items-start justify-between gap-4 border-b border-border/50 px-6 py-5">
        <div><h2 id="assign-shipment-title" className="text-xl font-semibold tracking-tight">{t("title")}</h2><p id="assign-shipment-description" className="mt-1 text-xs text-text-secondary">{t.rich("description", { driverName, name: (name) => <span className="font-medium text-text-primary">{name}</span> })}</p></div>
        <button type="button" aria-label={t("close")} disabled={mutation.isPending} onClick={onClose} className="grid size-8 shrink-0 place-items-center rounded-lg border border-border text-text-muted disabled:opacity-50">×</button>
      </header>
      <div className="space-y-4 px-6 py-5">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <label className="relative block min-w-0 basis-full sm:flex-1 sm:basis-0"><span className="sr-only">{t("search")}</span>
            <svg aria-hidden="true" className="pointer-events-none absolute start-4 top-3.5 size-4 text-text-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg>
            <input type="search" value={search} disabled={mutation.isPending} onChange={(event) => setSearch(event.target.value)} placeholder={t("searchPlaceholder")} className="h-11 w-full rounded-full border border-transparent bg-secondary ps-10 pe-4 text-sm outline-none placeholder:text-text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </label>
          <label className="relative"><span className="sr-only">{t("originHub")}</span>
            <select value={hub} disabled={mutation.isPending} onChange={(event) => setHub(event.target.value)} className="h-11 max-w-44 appearance-none rounded-full border border-transparent bg-secondary ps-4 pe-9 text-xs font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
              <option value="">{t("allHubs")}</option>{hubs.map((origin) => <option key={origin} value={origin}>{origin}</option>)}
            </select>
            <svg aria-hidden="true" className="pointer-events-none absolute end-4 top-4 size-3 text-text-secondary" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m4 6 4 4 4-4"/></svg>
          </label>
          <button type="button" disabled={mutation.isPending} aria-expanded={filtersOpen} aria-controls="shipment-filters" onClick={() => setFiltersOpen(!filtersOpen)} className={"inline-flex h-11 items-center gap-2 rounded-full px-4 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary/30 " + (status ? "bg-primary-muted text-primary" : "bg-secondary text-text-secondary")}>
            <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M4 4h16v3l-6 7v5l-4 2v-7L4 7V4Z"/></svg>{t("filters")}{status && <span className="sr-only">{t("activeFilters", { count: 1 })}</span>}
          </button>
        </div>
        {filtersOpen && <div id="shipment-filters" className="flex flex-wrap items-end gap-3 rounded-xl border border-border p-3">
          <label className="flex-1 text-xs text-text-secondary">{t("shipmentStatus")}<select value={status} disabled={mutation.isPending} onChange={(event) => setStatus(event.target.value)} className="mt-2 block h-9 w-full rounded-lg bg-secondary px-3 text-xs outline-none focus:ring-2 focus:ring-primary/30"><option value="">{t("allStatuses")}</option><option value="Pending">{t("Pending")}</option><option value="Ready for Pickup">{t("Ready for Pickup")}</option></select></label>
          <button type="button" disabled={mutation.isPending} onClick={() => { setHub(""); setStatus(""); setSearch(""); }} className="h-9 px-2 text-xs text-primary hover:underline">{t("clearFilters")}</button>
        </div>}
        {query.isPending ? <p role="status" className="py-8 text-center text-sm text-text-secondary">{t("loading")}</p>
          : query.isError ? <div role="alert" className="py-6 text-center text-sm text-destructive">{t("loadError")} <button type="button" onClick={() => void query.refetch()} className="underline">{t("retry")}</button></div>
          : !shipments.length ? <p role="status" className="py-8 text-center text-sm text-text-secondary">{t("empty")}</p>
          : !visible.length ? <p role="status" className="py-8 text-center text-sm text-text-secondary">{t("noResults")}</p>
          : <fieldset disabled={mutation.isPending} className="space-y-3"><legend className="sr-only">{t("selectOne")}</legend>{visible.map((shipment) => <label key={shipment.id} className={"flex cursor-pointer items-start gap-3 rounded-2xl border p-4 " + (selected?.id === shipment.id ? "border-primary/20 bg-primary-muted" : "border-border bg-card")}>
            <input type="radio" name="shipment" value={shipment.id} checked={selected?.id === shipment.id} onChange={() => { setSelected(shipment); mutation.reset(); }} className="mt-1 size-4 shrink-0 accent-primary" />
            <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center justify-between gap-2"><span className="text-sm font-semibold">#{shipment.id}</span><span className={"rounded-full px-2 py-0.5 text-[10px] " + (shipment.status === "Ready for Pickup" ? "bg-emerald-50 text-emerald-600" : "bg-secondary text-text-secondary")}>{t(shipment.status)}</span></span>
              <span className="mt-2 block text-xs">{shipment.origin} <span className="text-text-muted">→</span> {shipment.destination}</span>
              <span className="mt-2 flex flex-wrap justify-between gap-2 border-t border-border/30 pt-2 text-xs"><span><span className="text-text-muted">{t("recipient")}</span>{shipment.recipient}</span><span className="font-semibold">{t("amount", { amount: shipment.fee })}</span></span>
            </span>
          </label>)}</fieldset>}
        {selected && <div className="flex flex-wrap justify-between gap-2 rounded-xl bg-primary-muted p-3 text-xs font-medium text-primary"><span>{t("selected", { count: 1, id: selected.id })}</span><span>{t("totalFee", { amount: selected.fee })}</span></div>}
        {mutation.isError && <p role="alert" className="text-sm text-destructive">{translateError(mutation.error.message)}</p>}
      </div>
      <footer className="flex justify-end gap-3 border-t border-border/50 bg-secondary/30 px-6 py-5">
        <button type="button" disabled={mutation.isPending} onClick={onClose} className="rounded-xl bg-secondary px-5 py-2.5 text-sm disabled:opacity-50">{t("cancel")}</button>
        <button type="submit" disabled={!selected || mutation.isPending || query.isError} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50">{mutation.isPending ? t("assigning") : t("title")}</button>
      </footer>
    </form>
  </dialog>;
}
