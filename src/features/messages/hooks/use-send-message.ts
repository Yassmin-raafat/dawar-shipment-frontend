import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "@/services/messages-api";
import { conversationsQueryKey } from "./use-conversations";
import { messagesQueryKey } from "./use-messages";
import { toast } from "sonner";

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ conversationId, text }: { conversationId: string; text: string }) => sendMessage(conversationId, text),
    retry: false,
    networkMode: "always",
    onError: (error) => toast.error(error.message || "Could not send message. Please try again."),
    onSuccess: async (_message, { conversationId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: messagesQueryKey(conversationId) }),
        queryClient.invalidateQueries({ queryKey: conversationsQueryKey }),
      ]);
    },
  });
}
