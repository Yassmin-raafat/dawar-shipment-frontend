import { useMessageError } from "@/features/messages/hooks/use-message-error";
import { useTranslations } from "next-intl";
import ConversationItem from "./conversation-item";
import type { Conversation } from "@/features/messages/types/message";

export default function ConversationsList({ conversations, selectedId, search, onSearch, onSelect, isLoading, error, onRetry, onNewChat, hasConversations }: {
  conversations: Conversation[]; selectedId: string; search: string; onSearch: (value: string) => void; onSelect: (id: string) => void;
  isLoading: boolean; error?: string; onRetry: () => void; onNewChat: () => void; hasConversations: boolean;
}) {
  const t = useTranslations("messages");
  const translateError = useMessageError();
  return <section aria-labelledby="messages-title" className="flex h-full min-h-0 flex-col rounded-2xl bg-card">
    <div className="shrink-0 border-b border-border/20 px-4 pb-4 pt-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2"><h1 id="messages-title" className="text-sm font-semibold tracking-tight">{t("title")}</h1><span className="rounded-full bg-primary-muted px-2 py-0.5 text-[9px] font-medium text-primary">{t("newCount", { count: 4 })}</span></div>
        <button type="button" onClick={onNewChat} aria-label={t("newChat")} title={t("newChat")} className="grid size-7 place-items-center rounded-lg bg-secondary text-text-secondary">
          <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M15 4l5 5M10 14l-1 4 4-1L22 8a2 2 0 0 0-5-5l-7 11Z"/></svg>
        </button>
      </div>
      <label className="relative block"><span className="sr-only">{t("searchConversations")}</span>
        <svg aria-hidden="true" className="pointer-events-none absolute start-3 top-2.5 size-3.5 text-[#91a3bd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 5 5"/></svg>
        <input type="search" value={search} onChange={(event) => onSearch(event.target.value)} placeholder={t("searchPlaceholder")} className="h-8 w-full rounded-xl border border-transparent bg-secondary ps-8 pe-3 text-[10px] text-text-primary outline-none placeholder:text-text-placeholder focus:border-primary/40" />
      </label>
    </div>
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1.5">
      {isLoading ? <div role="status" aria-label={t("loadingConversationsLabel")} className="space-y-3 p-3">{[0, 1, 2, 3].map((row) => <div key={row} aria-hidden="true" className="h-14 animate-pulse rounded-xl bg-secondary motion-reduce:animate-none" />)}</div>
        : error ? <div role="alert" className="px-4 py-8 text-center text-xs text-destructive">{translateError(error, "conversationsUnavailable")}<button type="button" onClick={onRetry} className="mx-auto mt-3 block text-primary underline">{t("retryConversations")}</button></div>
        : conversations.length ? <ul>{conversations.map((conversation) => <ConversationItem key={conversation.id} conversation={conversation} selected={conversation.id === selectedId} onSelect={() => onSelect(conversation.id)} />)}</ul>
        : <p role="status" className="px-4 py-8 text-center text-xs text-text-secondary">{hasConversations ? t("noConversationResults") : t("noConversations")}</p>}
    </div>
  </section>;
}
