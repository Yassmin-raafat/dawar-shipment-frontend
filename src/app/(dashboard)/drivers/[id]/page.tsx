import type { Metadata } from "next";
import DriverDetailsPage from "@/features/drivers/components/driver-details-page";

export const metadata: Metadata = { title: "Driver Details | Dawar Parcel" };

export default async function DriverDetailsRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DriverDetailsPage id={id} />;
}
