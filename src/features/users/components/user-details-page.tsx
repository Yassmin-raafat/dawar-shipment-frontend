"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useUser, useUserShipments } from "@/features/users/hooks/use-user";
import { useOrderDrivers } from "@/features/orders/hooks/use-order-lookups";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import UserProfileHeader from "./user-profile-header";
import UserSummaryCard from "./user-summary-card";
import ActiveShipmentCard from "./active-shipment-card";
import RecentShipmentsTable from "./recent-shipments-table";

export default function UserDetailsPage({ id }: { id: string }) {
  const t = useTranslations("userDetails"); const router = useRouter();
  const userQuery = useUser(id); const shipmentsQuery = useUserShipments(id); const driversQuery = useOrderDrivers();
  if (userQuery.isLoading) return <div role="status" aria-label={t("loading")} className="mx-3 space-y-4"><div className="h-20 animate-pulse rounded-2xl bg-secondary" /><div className="grid gap-3 md:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-24 animate-pulse rounded-xl bg-secondary" />)}</div><div className="h-36 animate-pulse rounded-2xl bg-secondary" /><div className="h-48 animate-pulse rounded-2xl bg-secondary" /></div>;
  if (userQuery.isError || !userQuery.data) return <section role="alert" className="mx-3 rounded-2xl bg-card px-6 py-16 text-center"><h1 className="font-semibold">{userQuery.isError ? getApiErrorMessage(userQuery.error, t("loadError")) : t("notFound")}</h1><p className="mt-2 text-xs text-text-secondary">{userQuery.isError ? t("retryDescription") : t("notFoundDescription")}</p><div className="mt-5 flex justify-center gap-5 text-sm text-primary"><button type="button" onClick={() => router.back()}>{t("back")}</button>{userQuery.isError && <button type="button" onClick={() => void userQuery.refetch()}>{t("retry")}</button>}</div></section>;
  const shipments = shipmentsQuery.data?.shipments ?? []; const activeShipment = shipments.find((shipment) => shipment.status !== "DELIVERED");
  const driverName = activeShipment?.driverId ? driversQuery.data?.data.find((driver) => driver.userId === activeShipment.driverId)?.name : undefined;
  return <div className="mx-3 mb-6 space-y-4 text-text-primary"><div className="flex items-center gap-3"><button type="button" onClick={() => router.back()} aria-label={t("back")} className="grid size-8 place-items-center rounded-xl border border-border bg-card text-text-secondary">←</button><div><p className="text-[9px] text-text-secondary">{t("breadcrumb")} <span className="mx-1">›</span> <span className="text-primary">{t("view")}</span></p><h1 className="text-sm font-semibold">{t("title")}</h1></div></div><UserProfileHeader user={userQuery.data} /><div className="grid gap-3 rounded-2xl bg-card p-4 sm:grid-cols-3"><UserSummaryCard label={t("summary.totalOrders")} value={String(userQuery.data.totalOrders)} hint="—" icon="▣" /><UserSummaryCard label={t("summary.spend")} value="—" hint="—" icon="▣" /><UserSummaryCard label={t("summary.active")} value={`${activeShipment ? 1 : 0} ${t("summary.shipment")}`} hint="—" icon="▣" /></div><ActiveShipmentCard shipment={activeShipment} driverName={driverName} /><RecentShipmentsTable shipments={shipments} /></div>;
}
