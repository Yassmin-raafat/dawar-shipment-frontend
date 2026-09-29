import { getDrivers } from "@/services/drivers-api";
import { useQuery } from "@tanstack/react-query";
import type { DriverStatus } from "@/features/drivers/types/driver";

export const driversQueryKey = ["drivers"] as const;
export const driversListQueryKey = (params: { page: number; size: number; search?: string; status?: DriverStatus }) => [...driversQueryKey, params] as const;

export function useDrivers(params: { page: number; size: number; search?: string; status?: DriverStatus }) {
  return useQuery({
    queryKey: driversListQueryKey(params),
    queryFn: () => getDrivers(params),
    retry: false,
  });
}
