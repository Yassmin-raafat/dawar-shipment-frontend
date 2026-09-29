import { useQuery } from "@tanstack/react-query";
import { getConversations, getUnreadChatsCount, type ChatsParams } from "@/services/messages-api";

export const conversationsQueryKey = (params: ChatsParams) => ["chats", params] as const;
export const unreadChatsQueryKey = ["messages-unread-count"] as const;

export function useConversations(params: ChatsParams) {
  return useQuery({ queryKey: conversationsQueryKey(params), queryFn: () => getConversations(params), retry: false, networkMode: "always" });
}

export function useUnreadChatsCount() {
  return useQuery({ queryKey: unreadChatsQueryKey, queryFn: getUnreadChatsCount, retry: false, networkMode: "always" });
}
