import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDriver } from "@/services/drivers-api";
import type { AddDriverPayload } from "@/features/drivers/schemas/add-driver-schema";
import { driversQueryKey } from "./use-drivers";

export function useUpdateDriver(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddDriverPayload) => updateDriver(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: driversQueryKey }),
  });
}
