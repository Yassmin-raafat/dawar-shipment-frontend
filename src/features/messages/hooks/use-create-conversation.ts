import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createConversation } from "@/services/messages-api";
import type { Conversation } from "../types/message";
import { conversationsQueryKey } from "./use-conversations";

export function useCreateConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createConversation,
    retry: false,
    networkMode: "always",
    onSuccess: async (conversation) => {
      await queryClient.cancelQueries({ queryKey: conversationsQueryKey });
      queryClient.setQueryData<Conversation[]>(conversationsQueryKey, (current = []) => [conversation, ...current.filter((item) => item.id !== conversation.id)]);
      void queryClient.invalidateQueries({ queryKey: conversationsQueryKey });
      toast.success("Conversation ready.");
    },
    onError: (error) => toast.error(error.message || "Could not start conversation. Please try again."),
  });
}
