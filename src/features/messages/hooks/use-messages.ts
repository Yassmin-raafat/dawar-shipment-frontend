import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/services/messages-api";

export const messagesQueryKey = (conversationId: string) => ["messages", conversationId] as const;

export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: messagesQueryKey(conversationId), queryFn: () => getMessages(conversationId),
    enabled: Boolean(conversationId), retry: false, networkMode: "always",
  });
}
