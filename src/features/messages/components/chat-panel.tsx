import ConversationAvatar from "./conversation-avatar";
import MessageBubble from "./message-bubble";
import MessageInput from "./message-input";
import type { Conversation } from "@/features/messages/types/message";
import { useMessages } from "@/features/messages/hooks/use-messages";
import { useEffect, useRef } from "react";

export default function ChatPanel({ conversation, onBack }: { conversation: Conversation; onBack: () => void }) {
  const query = useMessages(conversation.id);
  const historyRef = useRef<HTMLDivElement>(null);
  const lastMessageId = query.data?.at(-1)?.id;
  useEffect(() => {
    const history = historyRef.current;
    if (history) history.scrollTop = history.scrollHeight;
  }, [conversation.id, lastMessageId]);
  return <section aria-label={`Conversation with ${conversation.name}`} className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl bg-[#fbfcfd]">
    <header className="flex shrink-0 items-center gap-3 border-b border-border/30 bg-card px-4 py-3">
      <button type="button" onClick={onBack} aria-label="Back to conversations" className="grid size-7 shrink-0 place-items-center rounded-lg text-text-secondary hover:bg-secondary md:hidden"><svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m14 5-7 7 7 7"/></svg></button>
      <ConversationAvatar conversation={conversation} />
      <div className="min-w-0 flex-1"><h2 className="truncate text-xs font-semibold">{conversation.name}</h2><p className="mt-0.5 truncate text-[10px] text-[#7387a5]">{conversation.subtitle}</p><span className="sr-only">{conversation.online ? "Online" : "Offline"}</span></div>
      <button type="button" aria-label="Conversation options (coming soon)" aria-disabled="true" title="Conversation options are coming soon" className="grid size-7 shrink-0 place-items-center rounded-lg text-[#91a3bd]">···</button>
    </header>
    <div ref={historyRef} key={`history-${conversation.id}`} role="region" aria-label="Message history" tabIndex={0} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/20 sm:px-5">
      <p className="py-8 text-center text-[9px] text-[#91a3bd]">{conversation.dateLabel}</p>
      {query.isPending ? <div role="status" aria-label="Loading messages" className="space-y-7"><div aria-hidden="true" className="h-16 w-3/4 animate-pulse rounded-2xl bg-secondary motion-reduce:animate-none"/><div aria-hidden="true" className="ml-auto h-16 w-3/4 animate-pulse rounded-2xl bg-primary-muted motion-reduce:animate-none"/></div>
        : query.isError ? <div role="alert" className="py-5 text-center text-xs text-destructive">{query.error.message}<button type="button" onClick={() => void query.refetch()} className="mx-auto mt-3 block text-primary underline">Retry messages</button></div>
        : query.data.length ? <ol className="space-y-7">{query.data.map((message) => <MessageBubble key={message.id} message={message} conversation={conversation} />)}</ol>
        : <p role="status" className="py-5 text-center text-xs text-text-secondary">No messages yet. Start the conversation below.</p>}
    </div>
    <MessageInput conversationId={conversation.id} recipient={conversation.name} />
  </section>;
}
