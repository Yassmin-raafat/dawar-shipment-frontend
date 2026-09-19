import { useQuery } from "@tanstack/react-query";
import { getChatUsers } from "@/services/messages-api";

export function useChatUsers() {
  return useQuery({ queryKey: ["chat-users"], queryFn: getChatUsers, retry: false, networkMode: "always" });
}
