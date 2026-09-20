import type { Metadata } from "next";
import DriverDetailsPage from "@/features/drivers/components/driver-details-page";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("driverDetails");
  return { title: `${t("title")} | Dawar Parcel` };
}

export default async function DriverDetailsRoute({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ assignShipment?: string; edit?: string }> }) {
  const { id } = await params;
  const { assignShipment, edit } = await searchParams;
  return <DriverDetailsPage key={`${id}:${assignShipment === "true"}:${edit === "true"}`} id={id} initialAssignShipmentOpen={assignShipment === "true"} initialEditOpen={edit === "true" && assignShipment !== "true"} />;
}
