import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDriverStatus } from "@/services/drivers-api";
import type { DriverStatus } from "@/features/drivers/types/driver";
import { driversQueryKey } from "./use-drivers";

export function useUpdateDriver(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: DriverStatus) => updateDriverStatus(userId, status),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: driversQueryKey }),
        queryClient.invalidateQueries({ queryKey: [...driversQueryKey, "detail", userId] }),
      ]);
    },
  });
}
