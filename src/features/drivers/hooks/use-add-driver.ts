import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDriver } from "@/services/drivers-api";
import { driversQueryKey } from "@/features/drivers/hooks/use-drivers";

export function useAddDriver() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDriver,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: driversQueryKey }),
  });
}
