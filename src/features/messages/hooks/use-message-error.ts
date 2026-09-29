import { useTranslations } from "next-intl";
import { getApiErrorMessage } from "@/lib/get-api-error-message";

// Translate known service errors at the presentation boundary; services stay locale-neutral.
const errorKeys = {
  "You are offline. Reconnect and try again.": "offlineError",
  "Conversation not found.": "conversationNotFound",
  "User not found. Please select another user.": "userNotFound",
  "Enter a message before sending.": "emptyMessageError",
} as const;

export function useMessageError() {
  const t = useTranslations("messages");
  return (error: unknown, fallback: "sendError" | "createError" | "usersError" | "messagesError" | "conversationsUnavailable") => {
    const message = getApiErrorMessage(error, "");
    const key = message && Object.hasOwn(errorKeys, message)
      ? errorKeys[message as keyof typeof errorKeys]
      : fallback;
    return Object.hasOwn(errorKeys, message) ? t(key) : message || t(key);
  };
}
