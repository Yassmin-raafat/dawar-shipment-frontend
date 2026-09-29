import { useQuery } from "@tanstack/react-query";
import type { ShipmentStatus } from "@/features/shipments/types/shipment";
import { getDriverShipments } from "@/services/shipments-api";

export const driverShipmentsQueryKey = (userId: string, status?: ShipmentStatus) => ["driver-shipments", userId, status ?? "all"] as const;
export function useDriverShipments(userId: string, status?: ShipmentStatus) {
  return useQuery({ queryKey: driverShipmentsQueryKey(userId, status), queryFn: () => getDriverShipments(userId, status), enabled: Boolean(userId) });
}
