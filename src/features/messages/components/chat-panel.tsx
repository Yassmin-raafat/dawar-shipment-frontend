import { useMessageError } from "@/features/messages/hooks/use-message-error";
import { useTranslations } from "next-intl";
import ConversationAvatar from "./conversation-avatar";
import MessageBubble from "./message-bubble";
import MessageInput from "./message-input";
import type { Conversation } from "@/features/messages/types/message";
import { useMessages } from "@/features/messages/hooks/use-messages";
import { useEffect, useRef } from "react";

export default function ChatPanel({ conversation, onBack }: { conversation: Conversation; onBack: () => void }) {
  const t = useTranslations("messages");
  const translateError = useMessageError();
  const {
    data: messages = [],
    error: messagesError,
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = useMessages(conversation.id);
  const historyRef = useRef<HTMLDivElement>(null);
  const lastMessageId = messages.at(-1)?.id;
  useEffect(() => {
    const history = historyRef.current;
    if (history) history.scrollTop = history.scrollHeight;
  }, [conversation.id, lastMessageId]);
  return <section aria-label={t("conversationWith", { name: conversation.name })} className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl bg-background">
    <header className="flex shrink-0 items-center gap-3 border-b border-border/30 bg-card px-4 py-3">
      <button type="button" onClick={onBack} aria-label={t("back")} className="grid size-7 shrink-0 place-items-center rounded-lg text-text-secondary hover:bg-secondary md:hidden"><svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m14 5-7 7 7 7"/></svg></button>
      <ConversationAvatar conversation={conversation} />
      <div className="min-w-0 flex-1"><h2 className="truncate text-xs font-semibold">{conversation.name}</h2><p className="mt-0.5 truncate text-[10px] text-[#7387a5]">{conversation.subtitle}</p><span className="sr-only">{conversation.online ? t("online") : t("offline")}</span></div>
      <button type="button" aria-label={t("options")} aria-disabled="true" title={t("optionsSoon")} className="grid size-7 shrink-0 place-items-center rounded-lg text-[#91a3bd]">···</button>
    </header>
    <div ref={historyRef} key={`history-${conversation.id}`} role="region" aria-label={t("history")} tabIndex={0} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/20 sm:px-5">
      <p className="py-8 text-center text-[9px] text-[#91a3bd]">{conversation.dateLabel === "Today" ? t("today") : conversation.dateLabel.startsWith("Today, ") ? t("todayWithDate", { date: conversation.dateLabel.slice(7) }) : conversation.dateLabel.startsWith("Yesterday, ") ? t("yesterdayWithDate", { date: conversation.dateLabel.slice(11) }) : conversation.dateLabel}</p>
      {isMessagesLoading ? <div role="status" aria-label={t("loadingMessages")} className="space-y-7"><div aria-hidden="true" className="h-16 w-3/4 animate-pulse rounded-2xl bg-secondary motion-reduce:animate-none"/><div aria-hidden="true" className="ms-auto h-16 w-3/4 animate-pulse rounded-2xl bg-primary-muted motion-reduce:animate-none"/></div>
        : messagesError ? <div role="alert" className="py-5 text-center text-xs text-destructive">{translateError(messagesError.message, "messagesError")}<button type="button" onClick={() => void refetchMessages()} className="mx-auto mt-3 block text-primary underline">{t("retryMessages")}</button></div>
        : messages.length ? <ol className="space-y-7">{messages.map((message) => <MessageBubble key={message.id} message={message} conversation={conversation} />)}</ol>
        : <p role="status" className="py-5 text-center text-xs text-text-secondary">{t("emptyMessages")}</p>}
    </div>
    <MessageInput conversationId={conversation.id} recipient={conversation.name} />
  </section>;
}
