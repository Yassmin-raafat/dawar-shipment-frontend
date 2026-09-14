import type { Shipment } from "@/features/shipments/types/shipment";
import { getDriverById } from "@/services/drivers-api";

// Session-local source of truth, independent of the query cache.
const shipments: Shipment[] = [
  { id: "EG-49125-CAI", recipient: "Ahmed Taha", origin: "Cairo Hub 4", destination: "Maadi Degla", fee: 240, status: "Ready for Pickup" },
  { id: "EG-50821-GIZ", recipient: "Nour El-Din", origin: "Nasr City DC", destination: "5th Settlement Hub", fee: 240, status: "Pending" },
  { id: "EG-33921-ALX", recipient: "Farida Youssef", origin: "Cairo Hub 4", destination: "Heliopolis Roxy", fee: 310, status: "Ready for Pickup" },
];

export function getAssignedShipments(driverId: string): Shipment[] {
  return shipments.filter((shipment) => shipment.driverId === driverId).map((shipment) => ({ ...shipment }));
}

export async function getAvailableShipments(): Promise<Shipment[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return shipments.filter((shipment) => !shipment.driverId && shipment.status !== "Assigned").map((shipment) => ({ ...shipment }));
}

export async function assignShipment({ shipmentId, driverId }: { shipmentId: string; driverId: string }): Promise<Shipment> {
  await getDriverById(driverId);
  // Check after the await so concurrent submissions cannot claim the same shipment.
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new Error("You are offline. Reconnect and try again.");
  }
  const index = shipments.findIndex((shipment) => shipment.id === shipmentId);
  if (index === -1) throw new Error("Shipment not found. Please choose another shipment.");
  if (shipments[index].driverId || shipments[index].status === "Assigned") {
    throw new Error("This shipment is no longer available. Please choose another shipment.");
  }
  shipments[index] = { ...shipments[index], driverId, status: "Assigned" };
  return { ...shipments[index] };
}
