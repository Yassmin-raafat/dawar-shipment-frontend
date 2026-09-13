import { useQuery } from "@tanstack/react-query";
import { DriverNotFoundError, getDriverById } from "@/services/drivers-api";
import { driversQueryKey } from "@/features/drivers/hooks/use-drivers";

export function useDriver(id: string) {
  return useQuery({
    queryKey: [...driversQueryKey, id],
    queryFn: () => getDriverById(id),
    retry: (failureCount, error) => !(error instanceof DriverNotFoundError) && failureCount < 2,
  });
}
