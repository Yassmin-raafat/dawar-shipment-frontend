import api from "@/lib/axios";
import type { Conversation, Message, MessageThread, UserSummary } from "@/features/messages/types/message";
import { setMessagesCurrentUserId } from "@/features/messages/services/messages-current-user";

type ApiEnvelope<T> = { status: string; data: T; pagination?: ChatPagination };
type ChatPagination = { totalElements: number; currentPage: number; size: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean };
type RawMessage = { id: number; content: string; sentAt: string; readAt: string | null; senderId: string; receiverId: string };
type RawChat = { targetUser: UserSummary; lastMessage: unknown; lastMessageAt: unknown; unreadCount: number };
type RawMessagesResponse = { currentUser: UserSummary; targetUser: UserSummary; messages: RawMessage[] };

export type ChatsParams = { page: number; size: number; search?: string };

const avatarStyles = ["bg-[#e6ede5] text-[#46604a]", "bg-[#eee6dc] text-[#79624b]", "bg-[#e2e9ef] text-[#476179]", "bg-[#e8e3db] text-[#6b5b40]"];

function getInitials(name: string) {
  return name.split(/\s+/).filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "?";
}

function readString(value: unknown, key?: string): string | null {
  if (typeof value === "string") return value;
  if (key && typeof value === "object" && value !== null && key in value) {
    const nested = (value as Record<string, unknown>)[key];
    return typeof nested === "string" ? nested : null;
  }
  return null;
}

function formatTimestamp(value: unknown) {
  const timestamp = readString(value) ?? readString(value, "sentAt") ?? readString(value, "createdAt");
  if (!timestamp) return "";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return timestamp;
  return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(date);
}

function getPreview(value: unknown) {
  return readString(value) ?? readString(value, "content") ?? "";
}

function toConversation(chat: RawChat, index: number): Conversation {
  const timestamp = formatTimestamp(chat.lastMessageAt);
  return {
    id: chat.targetUser.id,
    name: chat.targetUser.name,
    initials: getInitials(chat.targetUser.name),
    avatarColor: avatarStyles[index % avatarStyles.length],
    preview: getPreview(chat.lastMessage),
    timestamp,
    unreadCount: chat.unreadCount,
    subtitle: "",
    dateLabel: timestamp,
    profilePhotoUrl: chat.targetUser.profilePhotoUrl,
  };
}

export async function getConversations(params: ChatsParams): Promise<Conversation[]> {
  const { data } = await api.get<ApiEnvelope<RawChat[]>>("/api/v1/messages/chats", {
    params: { page: params.page, size: params.size, ...(params.search ? { search: params.search } : {}) },
  });
  return (data.data ?? []).map(toConversation);
}

export async function getMessages(targetUserId: string): Promise<MessageThread> {
  const { data } = await api.get<ApiEnvelope<RawMessagesResponse>>("/api/v1/messages", { params: { targetUserId, page: 1, size: 100 } });
  const thread = data.data;
  setMessagesCurrentUserId(thread?.currentUser?.id ?? null);
  const messages: Message[] = (thread?.messages ?? []).map((message) => ({
    id: String(message.id),
    sender: message.senderId === thread.currentUser.id ? thread.currentUser.name : thread.targetUser.name,
    text: message.content,
    timestamp: formatTimestamp(message.sentAt),
    direction: message.senderId === thread.currentUser.id ? "outgoing" : "incoming",
    readAt: message.readAt,
  }));
  return { currentUser: thread?.currentUser ?? null, targetUser: thread?.targetUser ?? null, messages };
}

export async function getUnreadChatsCount(): Promise<number> {
  const { data } = await api.get<ApiEnvelope<{ unreadChats: number }>>("/api/v1/messages/unread-count");
  return data.data?.unreadChats ?? 0;
}
