import type { ReactNode } from "react";

export default function OrderSummaryCard({ label, count, icon }: { label: string; count: number; icon: ReactNode }) {
  return <article className="flex min-h-20 items-center gap-3 rounded-2xl border border-border/40 bg-card px-4 py-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-muted text-primary">{icon}</span><div className="min-w-0"><p className="truncate text-[10px] text-text-secondary">{label}</p><p className="mt-1 text-lg font-semibold leading-none text-text-primary">{count}</p></div></article>;
}
