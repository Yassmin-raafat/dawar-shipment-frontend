import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/orders-api";

export const ordersQueryKey = ["orders"] as const;

export function useOrders() {
  return useQuery({ queryKey: ordersQueryKey, queryFn: getOrders });
}
