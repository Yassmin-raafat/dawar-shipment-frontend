import { useQuery } from "@tanstack/react-query";
import { getRecipientName } from "@/services/shipments-api";

export function useRecipientName(customerId?: string) {
  return useQuery<string | null>({
    queryKey: ["recipient", customerId],
    queryFn: () => getRecipientName(customerId),
    enabled: Boolean(customerId),
  });
}
