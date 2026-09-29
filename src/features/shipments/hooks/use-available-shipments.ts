import { useQuery } from "@tanstack/react-query";
import { getAvailableShipments } from "@/services/shipments-api";

export const shipmentsQueryKey = ["shipments"] as const;

export function useAvailableShipments(params: { page: number; size: number; search?: string }) {
  return useQuery({ queryKey: [...shipmentsQueryKey, "available", params], queryFn: () => getAvailableShipments(params) });
}
