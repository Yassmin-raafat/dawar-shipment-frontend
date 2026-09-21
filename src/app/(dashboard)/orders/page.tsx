import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import OrdersPage from "@/features/orders/components/orders-page";

export async function generateMetadata(): Promise<Metadata> { const t = await getTranslations("orders"); return { title: `${t("title")} | Dawar Parcel` }; }
export default function OrdersRoutePage() { return <OrdersPage />; }
