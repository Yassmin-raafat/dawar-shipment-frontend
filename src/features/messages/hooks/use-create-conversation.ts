import { useTranslations } from "next-intl";
import { useMessageError } from "@/features/messages/hooks/use-message-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createConversation } from "@/services/messages-api";
import type { Conversation } from "../types/message";
import { conversationsQueryKey } from "./use-conversations";

export function useCreateConversation() {
  const t = useTranslations("messages");
  const queryClient = useQueryClient();
  const translateError = useMessageError();
  return useMutation({
    mutationFn: createConversation,
    retry: false,
    networkMode: "always",
    onSuccess: async (conversation) => {
      await queryClient.cancelQueries({ queryKey: conversationsQueryKey });
      queryClient.setQueryData<Conversation[]>(conversationsQueryKey, (current = []) => [conversation, ...current.filter((item) => item.id !== conversation.id)]);
      void queryClient.invalidateQueries({ queryKey: conversationsQueryKey });
      toast.success(t("conversationReady"));
    },
    onError: (error) => toast.error(translateError(error.message, "createError")),
  });
}
