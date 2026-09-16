import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDriver } from "@/services/drivers-api";
import { driversQueryKey } from "@/features/drivers/hooks/use-drivers";
import { toast } from "sonner";

export function useAddDriver() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDriver,
    onSuccess: async (driver) => {
      await queryClient.invalidateQueries({ queryKey: driversQueryKey });
      toast.success(`${driver.name} was added successfully.`);
    },
    onError: (error) => toast.error(error.message || "Could not add driver. Please try again."),
  });
}
