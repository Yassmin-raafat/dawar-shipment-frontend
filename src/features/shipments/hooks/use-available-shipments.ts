import { useQuery } from "@tanstack/react-query";
import { getAvailableShipments } from "@/services/shipments-api";

export const shipmentsQueryKey = ["shipments"] as const;

export function useAvailableShipments() {
  return useQuery({ queryKey: [...shipmentsQueryKey, "available"], queryFn: getAvailableShipments });
}
