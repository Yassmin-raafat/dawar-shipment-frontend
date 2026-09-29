import { useQuery } from "@tanstack/react-query";
import { getDrivers } from "@/services/drivers-api";
import { getAdminUsers } from "@/services/shipments-api";

export const orderUsersQueryKey = ["order-users"] as const;
export const orderDriversQueryKey = ["order-drivers"] as const;

export function useOrderUsers() {
  return useQuery({ queryKey: orderUsersQueryKey, queryFn: getAdminUsers, retry: false });
}

export function useOrderDrivers() {
  return useQuery({ queryKey: orderDriversQueryKey, queryFn: () => getDrivers({ page: 1, size: 100 }), retry: false });
}
