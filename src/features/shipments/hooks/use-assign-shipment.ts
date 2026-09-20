import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignShipment } from "@/services/shipments-api";
import { driversQueryKey } from "@/features/drivers/hooks/use-drivers";
import { shipmentsQueryKey } from "./use-available-shipments";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useAssignmentError } from "./use-assignment-error";

export function useAssignShipment() {
  const t = useTranslations("shipmentAssignment");
  const translateError = useAssignmentError();
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
      toast.success(t("success", { id: shipment.id }));
    },
    onError: (error) => toast.error(translateError(error.message)),
  });
}
