import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignShipment } from "@/services/shipments-api";
import { driversQueryKey } from "@/features/drivers/hooks/use-drivers";
import { shipmentsQueryKey } from "./use-available-shipments";
import { toast } from "sonner";

export function useAssignShipment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignShipment,
    networkMode: "always",
    retry: false,
    onSuccess: async (shipment) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: driversQueryKey }),
        queryClient.invalidateQueries({ queryKey: shipmentsQueryKey }),
      ]);
      toast.success(`Shipment #${shipment.id} assigned successfully.`);
    },
    onError: (error) => toast.error(error.message || "Could not assign shipment. Please try again."),
  });
}
