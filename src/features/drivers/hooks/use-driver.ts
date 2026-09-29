import { useQuery } from "@tanstack/react-query";
import { DriverNotFoundError, getDriverById } from "@/services/drivers-api";
import { driversQueryKey } from "@/features/drivers/hooks/use-drivers";

export function useDriver(userId: string) {
  return useQuery({
    queryKey: [...driversQueryKey, "detail", userId],
    queryFn: () => getDriverById(userId),
    retry: (failureCount, error) => !(error instanceof DriverNotFoundError) && failureCount < 2,
  });
}
