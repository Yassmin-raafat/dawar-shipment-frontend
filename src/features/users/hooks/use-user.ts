import { useQuery } from "@tanstack/react-query";
import { getUserById, getUserShipments } from "@/services/users-api";

export const userQueryKey = (id: string) => ["users", id] as const;
export const userShipmentsQueryKey = (id: string) => ["user-shipments", id] as const;

export function useUser(id: string) {
  return useQuery({ queryKey: userQueryKey(id), queryFn: () => getUserById(id), enabled: Boolean(id), retry: false });
}

export function useUserShipments(id: string) {
  return useQuery({ queryKey: userShipmentsQueryKey(id), queryFn: () => getUserShipments(id), enabled: Boolean(id), retry: false });
}
