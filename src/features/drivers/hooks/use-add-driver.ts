import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDriver } from "@/services/drivers-api";
import { driversQueryKey } from "@/features/drivers/hooks/use-drivers";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useDriverFormError } from "./use-driver-form-error";
import { getApiErrorMessage } from "@/lib/get-api-error-message";

export function useAddDriver() {
  const t = useTranslations("driverForm");
  const translateError = useDriverFormError();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDriver,
    onSuccess: async (driver) => {
      await queryClient.invalidateQueries({ queryKey: driversQueryKey });
      toast.success(t("added", { name: driver.name }));
    },
    onError: (error) => toast.error(translateError(getApiErrorMessage(error, t("addError")), "addError")),
  });
}
