import { useQuery } from "@tanstack/react-query";
import { getUserById, UserNotFoundError } from "@/services/users-api";
export function useUser(id: string) { return useQuery({ queryKey: ["users", id], queryFn: () => getUserById(id), retry: (count, error) => !(error instanceof UserNotFoundError) && count < 2 }); }
