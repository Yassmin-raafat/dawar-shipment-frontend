import { useMessageError } from "@/features/messages/hooks/use-message-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "@/services/messages-api";
import { conversationsQueryKey } from "./use-conversations";
import { messagesQueryKey } from "./use-messages";
import { toast } from "sonner";

export function useSendMessage() {
  const queryClient = useQueryClient();
  const translateError = useMessageError();
  return useMutation({
    mutationFn: ({ conversationId, text }: { conversationId: string; text: string }) => sendMessage(conversationId, text),
    retry: false,
    networkMode: "always",
    onError: (error) => toast.error(translateError(error.message, "sendError")),
    onSuccess: async (_message, { conversationId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: messagesQueryKey(conversationId) }),
        queryClient.invalidateQueries({ queryKey: conversationsQueryKey }),
      ]);
    },
  });
}
