"use client";

import { useState } from "react";
import { useConversations } from "@/features/messages/hooks/use-conversations";
import ConversationsList from "./conversations-list";
import ChatPanel from "./chat-panel";

export default function MessagesPage() {
  const query = useConversations();
  const conversations = query.data ?? [];
  const [selectedId, setSelectedId] = useState<string>();
  const [search, setSearch] = useState("");
  const [showChat, setShowChat] = useState(false);
  const selected = conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0];
  const term = search.trim().toLowerCase();
  const visible = conversations.filter((conversation) => [conversation.name, conversation.shipmentId ?? "", conversation.preview].some((value) => value.toLowerCase().includes(term)));

  return <div className="mx-3 grid h-full min-h-0 min-w-0 gap-3 md:grid-cols-[minmax(260px,32%)_minmax(0,1fr)]">
    <div className={"min-h-0 min-w-0 " + (showChat ? "hidden md:block" : "")}>
      <ConversationsList conversations={visible} selectedId={selected?.id ?? ""} search={search} onSearch={setSearch} onSelect={(id) => { setSelectedId(id); setShowChat(true); }} isLoading={query.isPending} error={query.isError ? query.error.message : undefined} onRetry={() => void query.refetch()} hasConversations={conversations.length > 0} />
    </div>
    <div className={"min-h-0 min-w-0 " + (showChat ? "" : "hidden md:block")}>
      {selected ? <ChatPanel conversation={selected} onBack={() => setShowChat(false)} /> : <div role="status" className="flex h-full items-center justify-center rounded-2xl bg-[#fbfcfd] px-6 text-center text-xs text-text-secondary">{query.isPending ? "Loading conversations..." : query.isError ? "Conversations are unavailable. Please retry." : "No conversations yet."}</div>}
    </div>
  </div>;
}
