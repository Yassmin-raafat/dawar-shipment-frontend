import { getDrivers } from "@/services/drivers-api";
import { useQuery } from "@tanstack/react-query";

export function useDrivers() {
  return useQuery({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });
}
