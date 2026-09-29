"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import useDebounce from "@/hooks/use-debounce";
import { useOrders, useShipmentCounts } from "@/features/orders/hooks/use-orders";
import { useOrderDrivers, useOrderUsers } from "@/features/orders/hooks/use-order-lookups";
import type { ShipmentStatus } from "@/features/orders/types/order";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import OrderSummaryCard from "./order-summary-card";
import OrdersList from "./orders-list";
import OrderMap from "./order-map";
import OrderDetailsPanel from "./order-details-panel";

const emptyOrders: never[] = [];

export default function OrdersPage() {
  const t = useTranslations("orders");
  const [selectedId, setSelectedId] = useState<string>();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ShipmentStatus | "">("");
  const debouncedSearch = useDebounce(search);
  const query = useOrders(status || undefined);
  const allOrdersQuery = useOrders();
  const countsQuery = useShipmentCounts();
  const usersQuery = useOrderUsers();
  const driversQuery = useOrderDrivers();
  // The list must use the same unfiltered response as the summary until a
  // status filter is explicitly selected. This prevents two observers of the
  // same query from briefly rendering different cache states after a refresh.
  const orders = status ? query.data ?? emptyOrders : allOrdersQuery.data ?? emptyOrders;
  const activeOrdersQuery = status ? query : allOrdersQuery;
  const summaryOrders = allOrdersQuery.data ?? orders;
  // The endpoint returns the complete, unpaginated result set. Search is kept
  // local because the API explicitly rejects a search query parameter.
  const filtered = useMemo(() => {
    const value = debouncedSearch.trim().toLowerCase();
    return value ? orders.filter((order) => [order.id, order.orderNumber, order.customerId, order.driverId ?? "", order.pickupAddress, order.deliveryAddress].some((field) => field.toLowerCase().includes(value))) : orders;
  }, [debouncedSearch, orders]);
  const selected = filtered.find((order) => order.id === selectedId) ?? filtered[0];
  const labels: Record<ShipmentStatus, string> = {
    ASSIGNED: t("status.ASSIGNED"), ON_THE_WAY: t("status.ON_THE_WAY"), DELIVERED: t("status.DELIVERED"), FINDING_DRIVER: t("status.FINDING_DRIVER"),
  };
  const total = countsQuery.data?.shipments ?? summaryOrders.length;
  const delivered = summaryOrders.filter((order) => order.status === "DELIVERED").length;
  const pending = summaryOrders.filter((order) => order.status === "FINDING_DRIVER").length;
  const inTransit = summaryOrders.filter((order) => order.status === "ON_THE_WAY").length;
  const errorMessage = activeOrdersQuery.isError ? getApiErrorMessage(activeOrdersQuery.error, t("loadError")) : null;

  if (activeOrdersQuery.isLoading) return <div className="mx-3 space-y-4"><div className="grid gap-3 sm:grid-cols-4">{[1, 2, 3, 4].map((item) => <div key={item} className="h-28 animate-pulse rounded-2xl bg-secondary" />)}</div><div className="h-[560px] animate-pulse rounded-2xl bg-secondary" /></div>;
  if (activeOrdersQuery.isError) return <section className="mx-3 rounded-2xl bg-card px-6 py-16 text-center"><h1 className="font-semibold">{errorMessage}</h1><button type="button" onClick={() => void activeOrdersQuery.refetch()} className="mt-4 text-sm text-primary underline">{t("retry")}</button></section>;

  return <div className="mx-3 mb-6 space-y-4 text-text-primary">
    <div className="flex items-center justify-between"><div><h1 className="text-xl font-semibold">{t("title")}</h1><p className="mt-1 text-xs text-text-secondary">{t("subtitle")}</p></div></div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <OrderSummaryCard label={t("summary.total")} count={total} icon={<span>↗</span>} />
      <OrderSummaryCard label={t("summary.delivered")} count={delivered} icon={<span>✓</span>} />
      <OrderSummaryCard label={t("summary.pending")} count={pending} icon={<span>◷</span>} />
      <OrderSummaryCard label={t("summary.inTransit")} count={inTransit} icon={<span>→</span>} />
    </div>
    <div className="grid min-h-[650px] gap-4 xl:grid-cols-[minmax(270px,0.46fr)_minmax(540px,1fr)]">
      <section className="flex min-h-0 flex-col rounded-2xl bg-card p-3">
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="order-search">{t("search")}</label>
          <input id="order-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("searchPlaceholder")} className="h-9 min-w-0 flex-1 rounded-xl bg-secondary px-3 text-[10px] outline-none focus:ring-2 focus:ring-primary/20" />
          <label className="relative grid size-9 shrink-0 place-items-center rounded-xl bg-secondary text-text-secondary"><span className="sr-only">{t("filter")}</span><select aria-label={t("filter")} value={status} onChange={(event) => { setStatus(event.target.value as ShipmentStatus | ""); setSelectedId(undefined); }} className="absolute inset-0 cursor-pointer opacity-0"><option value="">{t("allStatuses")}</option><option value="FINDING_DRIVER">{labels.FINDING_DRIVER}</option><option value="ASSIGNED">{labels.ASSIGNED}</option><option value="ON_THE_WAY">{labels.ON_THE_WAY}</option><option value="DELIVERED">{labels.DELIVERED}</option></select><span aria-hidden="true">☷</span></label>
        </div>
        <div className="mt-3 min-h-0 flex-1">{filtered.length ? <OrdersList orders={filtered} recipients={usersQuery.data ?? emptyOrders} drivers={driversQuery.data?.data ?? emptyOrders} selectedId={selected?.id} onSelect={setSelectedId} labels={labels} /> : <p role="status" className="py-16 text-center text-xs text-text-secondary">{search ? t("noResults") : t("empty")}</p>}</div>
      </section>
      {selected ? <div className="relative min-h-[650px] overflow-hidden rounded-2xl"><OrderMap order={selected} label={t("mapLabel")} /><div className="mt-3 w-full min-w-0 px-1 xl:absolute xl:end-4 xl:top-4 xl:mt-0 xl:w-[min(44%,360px)] xl:min-w-[300px] xl:max-h-[calc(100%-2rem)] xl:overflow-y-auto"><OrderDetailsPanel order={selected} recipient={usersQuery.data?.find((user) => user.id === selected.customerId) ?? null} driver={selected.driverId ? driversQuery.data?.data.find((driver) => driver.userId === selected.driverId) ?? null : null} t={t} /></div></div> : <div className="grid place-items-center rounded-2xl bg-card text-sm text-text-secondary">{t("empty")}</div>}
    </div>
  </div>;
}
