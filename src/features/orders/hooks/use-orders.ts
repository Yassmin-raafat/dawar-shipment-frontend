import { useQuery } from "@tanstack/react-query";
import { getOrders, getShipmentCounts } from "@/services/orders-api";
import type { ShipmentStatus } from "@/features/orders/types/order";

export const ordersQueryKey = ["orders"] as const;
export const shipmentCountsQueryKey = ["shipment-counts"] as const;

export function useOrders(status?: ShipmentStatus) {
  return useQuery({ queryKey: [...ordersQueryKey, { status: status ?? null }], queryFn: () => getOrders(status) });
}

export function useShipmentCounts() {
  return useQuery({ queryKey: shipmentCountsQueryKey, queryFn: getShipmentCounts });
}
