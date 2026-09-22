"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import type { Order } from "@/features/orders/types/order";

function OrderMapLoading() {
  const t = useTranslations("orders");

  return <div aria-busy="true" role="status" className="grid h-full min-h-[650px] place-items-center bg-secondary text-xs text-text-secondary">{t("mapLoading")}</div>;
}

const MapLibreOrderMap = dynamic(() => import("./order-maplibre-map"), {
  ssr: false,
  loading: OrderMapLoading,
});

export default function OrderMap({ order, label }: { order: Order; label: string }) {
  const t = useTranslations("orders");

  if (!order.coordinates?.origin || !order.coordinates?.destination) {
    return <section aria-label={label} className="grid h-full min-h-[650px] place-items-center rounded-2xl border border-border/40 bg-secondary px-6 text-center text-xs text-text-secondary">{t("mapUnavailable")}</section>;
  }

  return <section aria-label={label} className="h-full min-h-[650px] overflow-hidden rounded-2xl border border-border/40 bg-secondary"><MapLibreOrderMap order={order} pickupLabel={t("pickup")} destinationLabel={t("delivery")} errorLabel={t("mapError")} /></section>;
}
