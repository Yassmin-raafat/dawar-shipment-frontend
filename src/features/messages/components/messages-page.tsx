"use client";

import { useTranslations } from "next-intl";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useConversations, useUnreadChatsCount } from "@/features/messages/hooks/use-conversations";
import ConversationsList from "./conversations-list";
import ChatPanel from "./chat-panel";
import NewChatModal from "./new-chat-modal";
import type { Conversation } from "@/features/messages/types/message";
import type { DriverListItem } from "@/features/drivers/types/driver";
import useDebounce from "@/hooks/use-debounce";
import { connectMessagesSocket, disconnectMessagesSocket } from "@/features/messages/services/messages-socket";
import { getMessagesCurrentUserId, subscribeToMessagesCurrentUser } from "@/features/messages/services/messages-current-user";

export default function MessagesPage() {
  useEffect(() => {
    connectMessagesSocket();
    return disconnectMessagesSocket;
  }, []);

  const t = useTranslations("messages");
  const [selectedId, setSelectedId] = useState<string>();
  const [temporaryConversation, setTemporaryConversation] = useState<Conversation | null>(null);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const {
    data: conversations = [],
    error: conversationsError,
    isLoading: isConversationsLoading,
    refetch: refetchConversations,
  } = useConversations({ page: 1, size: 100, search: debouncedSearch.trim() || undefined });
  const { data: unreadCount = 0 } = useUnreadChatsCount();
  const [showChat, setShowChat] = useState(false);
  const currentAdminUserId = useSyncExternalStore(subscribeToMessagesCurrentUser, getMessagesCurrentUserId, () => null);
  const selected = temporaryConversation ?? conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0];
  const selectDriver = (driver: DriverListItem) => { setTemporaryConversation({ id: driver.userId, name: driver.name, initials: driver.name.split(" ").map((part) => part[0]).join("").slice(0, 2), avatarColor: "bg-primary-muted text-primary", preview: "", timestamp: "", unreadCount: 0, subtitle: `${driver.vehicleBrand} · ${driver.vehicleType}`, dateLabel: "", profilePhotoUrl: null }); setSelectedId(driver.userId); setShowChat(true); setIsNewChatOpen(false); };

  return <div className="mx-3 grid h-full min-h-0 min-w-0 gap-3 md:grid-cols-[minmax(260px,32%)_minmax(0,1fr)]">
    <div className={"min-h-0 min-w-0 " + (showChat ? "hidden md:block" : "")}>
      <ConversationsList conversations={conversations} unreadCount={unreadCount} selectedId={selected?.id ?? ""} search={search} onSearch={setSearch} onSelect={(id) => { setTemporaryConversation(null); setSelectedId(id); setShowChat(true); }} onNewChat={() => setIsNewChatOpen(true)} isLoading={isConversationsLoading} error={conversationsError?.message} onRetry={() => void refetchConversations()} hasConversations={conversations.length > 0} />
    </div>
    <div className={"min-h-0 min-w-0 " + (showChat ? "" : "hidden md:block")}>
      {selected ? <ChatPanel conversation={selected} onBack={() => setShowChat(false)} /> : <div role="status" className="flex h-full items-center justify-center rounded-2xl bg-background px-6 text-center text-xs text-text-secondary">{isConversationsLoading ? t("loadingConversations") : conversationsError ? t("conversationsUnavailable") : t("noConversations")}</div>}
    </div>
    {isNewChatOpen && <NewChatModal currentAdminUserId={currentAdminUserId} onClose={() => setIsNewChatOpen(false)} onSelect={selectDriver} />}
  </div>;
}
