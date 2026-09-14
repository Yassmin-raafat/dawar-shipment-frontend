import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignShipment } from "@/services/shipments-api";
import { driversQueryKey } from "@/features/drivers/hooks/use-drivers";
import { shipmentsQueryKey } from "./use-available-shipments";

export function useAssignShipment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignShipment,
    networkMode: "always",
    retry: false,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: driversQueryKey }),
        queryClient.invalidateQueries({ queryKey: shipmentsQueryKey }),
      ]);
    },
  });
}
