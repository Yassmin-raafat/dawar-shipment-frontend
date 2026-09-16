import ConversationItem from "./conversation-item";
import type { Conversation } from "@/features/messages/types/message";

export default function ConversationsList({ conversations, selectedId, search, onSearch, onSelect, isLoading, error, onRetry, hasConversations }: {
  conversations: Conversation[]; selectedId: string; search: string; onSearch: (value: string) => void; onSelect: (id: string) => void;
  isLoading: boolean; error?: string; onRetry: () => void; hasConversations: boolean;
}) {
  return <section aria-labelledby="messages-title" className="flex h-full min-h-0 flex-col rounded-2xl bg-card">
    <div className="shrink-0 border-b border-border/20 px-4 pb-4 pt-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2"><h1 id="messages-title" className="text-sm font-semibold tracking-tight">Messages</h1><span className="rounded-full bg-primary-muted px-2 py-0.5 text-[9px] font-medium text-primary">4 New</span></div>
        <button type="button" aria-label="New message (coming soon)" aria-disabled="true" title="New messages are coming soon" className="grid size-7 place-items-center rounded-lg bg-[#f5f7fa] text-[#52647e]">
          <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M15 4l5 5M10 14l-1 4 4-1L22 8a2 2 0 0 0-5-5l-7 11Z"/></svg>
        </button>
      </div>
      <label className="relative block"><span className="sr-only">Search conversations</span>
        <svg aria-hidden="true" className="pointer-events-none absolute left-3 top-2.5 size-3.5 text-[#91a3bd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 5 5"/></svg>
        <input type="search" value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search driver, shipment ID, name..." className="h-8 w-full rounded-xl border border-transparent bg-[#f5f7fa] pl-8 pr-3 text-[10px] text-text-primary outline-none placeholder:text-[#91a3bd] focus:border-primary/40" />
      </label>
    </div>
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1.5">
      {isLoading ? <div role="status" aria-label="Loading conversations" className="space-y-3 p-3">{[0, 1, 2, 3].map((row) => <div key={row} aria-hidden="true" className="h-14 animate-pulse rounded-xl bg-secondary motion-reduce:animate-none" />)}</div>
        : error ? <div role="alert" className="px-4 py-8 text-center text-xs text-destructive">{error}<button type="button" onClick={onRetry} className="mx-auto mt-3 block text-primary underline">Retry conversations</button></div>
        : conversations.length ? <ul>{conversations.map((conversation) => <ConversationItem key={conversation.id} conversation={conversation} selected={conversation.id === selectedId} onSelect={() => onSelect(conversation.id)} />)}</ul>
        : <p role="status" className="px-4 py-8 text-center text-xs text-text-secondary">{hasConversations ? "No conversations match your search." : "No conversations yet."}</p>}
    </div>
  </section>;
}
