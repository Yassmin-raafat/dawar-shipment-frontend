"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import useDebounce from "@/hooks/use-debounce";
import { useOrders } from "@/features/orders/hooks/use-orders";
import OrderSummaryCard from "./order-summary-card";
import OrdersList from "./orders-list";
import OrderMap from "./order-map";
import OrderDetailsPanel from "./order-details-panel";

export default function OrdersPage() {
  const t = useTranslations("orders");
  const query = useOrders();
  const [selectedId, setSelectedId] = useState<string>();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const orders = useMemo(() => query.data ?? [], [query.data]);
  const filtered = useMemo(() => { const value = debouncedSearch.trim().toLowerCase(); return value ? orders.filter((order) => [order.id, order.trackingId, order.driver.name, order.origin, order.destination].some((field) => field.toLowerCase().includes(value))) : orders; }, [debouncedSearch, orders]);
  const selected = filtered.find((order) => order.id === selectedId) ?? filtered[0];
  const labels = { Delivered: t("status.Delivered"), Pending: t("status.Pending"), "In Transit": t("status.In Transit") };
  if (query.isLoading) return <div className="mx-3 space-y-4"><div className="grid gap-3 sm:grid-cols-4">{[1, 2, 3, 4].map((item) => <div key={item} className="h-28 animate-pulse rounded-2xl bg-secondary" />)}</div><div className="h-[560px] animate-pulse rounded-2xl bg-secondary" /></div>;
  if (query.isError) return <section className="mx-3 rounded-2xl bg-card px-6 py-16 text-center"><h1 className="font-semibold">{t("loadError")}</h1><button type="button" onClick={() => void query.refetch()} className="mt-4 text-sm text-primary underline">{t("retry")}</button></section>;
  return <div className="mx-3 mb-6 space-y-4 text-text-primary"><div className="flex items-center justify-between"><div><h1 className="text-xl font-semibold">{t("title")}</h1><p className="mt-1 text-xs text-text-secondary">{t("subtitle")}</p></div></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><OrderSummaryCard label={t("summary.total")} count={orders.length} icon={<span>↗</span>} /><OrderSummaryCard label={t("summary.delivered")} count={orders.filter((o) => o.status === "Delivered").length} icon={<span>✓</span>} /><OrderSummaryCard label={t("summary.pending")} count={orders.filter((o) => o.status === "Pending").length} icon={<span>◷</span>} /><OrderSummaryCard label={t("summary.inTransit")} count={orders.filter((o) => o.status === "In Transit").length} icon={<span>→</span>} /></div><div className="grid min-h-[650px] gap-4 xl:grid-cols-[minmax(270px,0.46fr)_minmax(540px,1fr)]"><section className="flex min-h-0 flex-col rounded-2xl bg-card p-3"><div className="flex items-center gap-2"><label className="sr-only" htmlFor="order-search">{t("search")}</label><input id="order-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("searchPlaceholder")} className="h-9 min-w-0 flex-1 rounded-xl bg-secondary px-3 text-[10px] outline-none focus:ring-2 focus:ring-primary/20" /><button type="button" aria-label={t("filter")} className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary text-text-secondary">☷</button></div><div className="mt-3 min-h-0 flex-1">{filtered.length ? <OrdersList orders={filtered} selectedId={selected?.id} onSelect={setSelectedId} labels={labels} /> : <p role="status" className="py-16 text-center text-xs text-text-secondary">{search ? t("noResults") : t("empty")}</p>}</div></section>{selected ? <div className="relative min-h-[650px] overflow-hidden rounded-2xl"><OrderMap order={selected} label={t("mapLabel")} /><div className="absolute end-4 top-4 z-10 w-[min(44%,360px)] min-w-[300px] max-h-[calc(100%-2rem)] overflow-y-auto"><OrderDetailsPanel order={selected} t={t} /></div></div> : <div className="grid place-items-center rounded-2xl bg-card text-sm text-text-secondary">{t("empty")}</div>}</div></div>;
}
