import { mockConversations } from "@/features/messages/data/mock-conversations";
import { mockChatUsers } from "@/features/messages/data/mock-chat-users";
import type { ChatUser } from "@/features/messages/types/chat-user";
import type { Conversation, Message } from "@/features/messages/types/message";

// The service owns session-local data. Query results are copies, never the store.
const conversations = structuredClone(mockConversations);
let nextMessageId = 1;

async function wait(milliseconds = 350) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    throw new Error("You are offline. Reconnect and try again.");
  }
}

function findConversation(conversationId: string) {
  const conversation = conversations.find((item) => item.id === conversationId);
  if (!conversation) throw new Error("Conversation not found.");
  return conversation;
}

export async function getConversations(): Promise<Conversation[]> {
  await wait();
  return conversations.map((conversation) => {
    const { messages, ...summary } = conversation;
    void messages;
    return { ...summary };
  });
}

export async function getChatUsers(): Promise<ChatUser[]> {
  await wait();
  return mockChatUsers.map((user) => ({ ...user }));
}

export async function createConversation(userId: string): Promise<Conversation> {
  await wait(600);
  const user = mockChatUsers.find((item) => item.id === userId);
  if (!user) throw new Error("User not found. Please select another user.");
  let conversation = conversations.find((item) => item.id === userId);
  if (!conversation) {
    conversation = { ...user, preview: "No messages yet.", timestamp: "Just now", unreadCount: 0, dateLabel: "Today", messages: [] };
    conversations.unshift(conversation);
  }
  const { messages, ...summary } = conversation;
  void messages;
  return { ...summary };
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  await wait();
  return findConversation(conversationId).messages.map((message) => ({ ...message }));
}

export async function sendMessage(conversationId: string, text: string): Promise<Message> {
  const trimmedText = text.trim();
  if (!trimmedText) throw new Error("Enter a message before sending.");
  await wait(600);
  const conversation = findConversation(conversationId);
  const message: Message = {
    id: `sent-${nextMessageId++}`,
    sender: "You",
    direction: "outgoing",
    text: trimmedText,
    timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  };
  conversation.messages.push(message);
  conversation.preview = message.text;
  conversation.timestamp = "Just now";
  return { ...message };
}
