"use client";

import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { DriverStatus } from "@/features/drivers/types/driver";
import { useUpdateDriver } from "@/features/drivers/hooks/use-update-driver";
import { toast } from "sonner";

const statuses: DriverStatus[] = ["PENDING_REVIEW", "ACTIVE", "REJECTED", "SUSPENDED"];

export default function EditDriverStatusModal({ userId, currentStatus, onClose }: { userId: string; currentStatus: DriverStatus; onClose: () => void }) {
  const t = useTranslations("driverDetails");
  const [status, setStatus] = useState<DriverStatus>(currentStatus);
  const mutation = useUpdateDriver(userId);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = dialogRef.current; dialog?.showModal(); return () => dialog?.close(); }, []);
  const errorMessage = mutation.isError ? getApiErrorMessage(mutation.error, t("updateError")) : undefined;
  return <dialog ref={dialogRef} aria-labelledby="edit-driver-title" onCancel={(event) => { event.preventDefault(); if (!mutation.isPending) onClose(); }} className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-sm rounded-2xl border border-border bg-card p-0 text-text-primary shadow-xl backdrop:bg-black/40"><form onSubmit={(event) => { event.preventDefault(); mutation.mutate(status, { onSuccess: () => { toast.success(t("statusUpdated")); onClose(); } }); }}><header className="flex items-center justify-between border-b border-border/40 px-5 py-4"><h2 id="edit-driver-title" className="text-sm font-semibold">{t("edit")}</h2><button type="button" aria-label={t("closeEdit")} disabled={mutation.isPending} onClick={onClose} className="text-text-muted">×</button></header><div className="p-5"><label className="block text-xs text-text-secondary" htmlFor="driver-status">{t("status")}</label><select id="driver-status" value={status} disabled={mutation.isPending} onChange={(event) => setStatus(event.target.value as DriverStatus)} className="mt-2 h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm">{statuses.map((value) => <option key={value} value={value}>{t(value)}</option>)}</select>{mutation.isError && <p role="alert" className="mt-3 text-xs text-destructive">{errorMessage || t("updateError")}</p>}</div><footer className="flex justify-end gap-2 border-t border-border/40 px-5 py-4"><button type="button" disabled={mutation.isPending} onClick={onClose} className="rounded-xl bg-secondary px-4 py-2 text-xs">{t("cancel")}</button><button type="submit" disabled={mutation.isPending} className="rounded-xl bg-primary px-4 py-2 text-xs text-primary-foreground">{mutation.isPending ? t("saving") : t("save")}</button></footer></form></dialog>;
}
