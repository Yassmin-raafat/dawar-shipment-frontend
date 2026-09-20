import { useTranslations } from "next-intl";

// Translate known service errors at the presentation boundary; services stay locale-neutral.
const errorKeys = {
  "You are offline. Reconnect and try again.": "offlineError",
  "Conversation not found.": "conversationNotFound",
  "User not found. Please select another user.": "userNotFound",
  "Enter a message before sending.": "emptyMessageError",
} as const;

export function useMessageError() {
  const t = useTranslations("messages");
  return (message: string | undefined, fallback: "sendError" | "createError" | "usersError" | "messagesError" | "conversationsUnavailable") => {
    const key = message && Object.hasOwn(errorKeys, message)
      ? errorKeys[message as keyof typeof errorKeys]
      : fallback;
    return t(key);
  };
}
