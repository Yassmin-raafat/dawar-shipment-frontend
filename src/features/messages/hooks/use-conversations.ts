import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getConversations, markConversationAsRead } from "@/services/messages-api";
import type { Conversation } from "@/features/messages/types/message";

export const conversationsQueryKey = ["conversations"] as const;

export function useConversations() {
  return useQuery({ queryKey: conversationsQueryKey, queryFn: getConversations, retry: false, networkMode: "always" });
}

export function useMarkConversationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markConversationAsRead,
    onMutate: async (conversationId) => {
      await queryClient.cancelQueries({ queryKey: conversationsQueryKey });
      const previousConversations = queryClient.getQueryData(conversationsQueryKey);
      queryClient.setQueryData<Conversation[]>(conversationsQueryKey, (conversations) =>
        conversations?.map((conversation) => conversation.id === conversationId ? { ...conversation, unreadCount: 0 } : conversation),
      );
      return { previousConversations };
    },
    onError: (_error, _conversationId, context) => {
      if (context?.previousConversations) queryClient.setQueryData(conversationsQueryKey, context.previousConversations);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: conversationsQueryKey });
    },
  });
}
