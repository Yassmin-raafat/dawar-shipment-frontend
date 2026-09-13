import { getDrivers } from "@/services/drivers-api";
import { useQuery } from "@tanstack/react-query";

export const driversQueryKey = ["drivers"] as const;

export function useDrivers() {
  return useQuery({
    queryKey: driversQueryKey,
    queryFn: getDrivers,
  });
}
