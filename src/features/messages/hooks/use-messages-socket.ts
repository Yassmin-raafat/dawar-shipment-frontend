import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { connectMessagesSocket, getMessagesSocket } from "@/features/messages/services/messages-socket";
import { unreadChatsQueryKey } from "@/features/messages/hooks/use-conversations";
import { messagesQueryKey } from "@/features/messages/hooks/use-messages";
import type { Message, MessageThread } from "@/features/messages/types/message";

type SocketMessage = {
  id?: string | number;
  content?: string;
  text?: string;
  sentAt?: string;
  timestamp?: string;
  readAt?: string | null;
  senderId?: string;
  receiverId?: string;
};

function isSocketMessage(value: unknown): value is SocketMessage {
  return typeof value === "object" && value !== null;
}

function getMessageId(message: SocketMessage) {
  return message.id === undefined ? null : String(message.id);
}

function getMessageText(message: SocketMessage) {
  return typeof message.content === "string" ? message.content : typeof message.text === "string" ? message.text : null;
}

function getMessageTimestamp(message: SocketMessage) {
  return typeof message.sentAt === "string" ? message.sentAt : typeof message.timestamp === "string" ? message.timestamp : null;
}

function toCachedMessage(message: SocketMessage, thread: MessageThread): Message | null {
  const id = getMessageId(message);
  const text = getMessageText(message);
  const timestamp = getMessageTimestamp(message);
  if (!id || text === null || timestamp === null || !message.senderId || !message.receiverId) return null;

  const isOutgoing = message.senderId === thread.currentUser?.id;
  return {
    id,
    sender: isOutgoing ? thread.currentUser?.name ?? "You" : thread.targetUser?.name ?? "",
    text,
    timestamp,
    direction: isOutgoing ? "outgoing" : "incoming",
    readAt: message.readAt ?? null,
  };
}

export function useMessagesSocket(conversationId: string) {
  const queryClient = useQueryClient();
  const [isSending, setIsSending] = useState(false);
  const sendingRef = useRef(false);

  useEffect(() => {
    const socket = connectMessagesSocket();
    if (!socket) return;

    const handleReceive = (payload: unknown) => {
      if (process.env.NODE_ENV !== "production") console.info("[messages-socket] receive:message", payload);
      const message = isSocketMessage(payload) ? payload : null;
      const belongsToConversation = Boolean(message && (message.senderId === conversationId || message.receiverId === conversationId));
      if (belongsToConversation && message) {
        queryClient.setQueryData<MessageThread>(messagesQueryKey(conversationId), (thread) => {
          if (!thread) return thread;
          const cachedMessage = toCachedMessage(message, thread);
          if (!cachedMessage || thread.messages.some((item) => item.id === cachedMessage.id)) return thread;
          return { ...thread, messages: [...thread.messages, cachedMessage] };
        });
        void queryClient.invalidateQueries({ queryKey: messagesQueryKey(conversationId) });
      }
      void queryClient.invalidateQueries({ queryKey: ["chats"] });
      void queryClient.invalidateQueries({ queryKey: unreadChatsQueryKey });
    };

    socket.on("receive:message", handleReceive);
    if (process.env.NODE_ENV !== "production") console.info("[messages-socket] receive:message listener attached", JSON.stringify({ socketId: socket.id, connected: socket.connected }));
    return () => {
      socket.off("receive:message", handleReceive);
    };
  }, [conversationId, queryClient]);

  const sendMessage = useCallback((content: string) => {
    const trimmedContent = content.trim();
    if (!trimmedContent || sendingRef.current) return false;

    const socket = getMessagesSocket();
    if (!socket?.connected) {
      toast.error("Messages are disconnected. Please try again.");
      return false;
    }

    sendingRef.current = true;
    setIsSending(true);
    try {
      socket.emit("send:message", { content: trimmedContent, receiverId: conversationId });
      void queryClient.invalidateQueries({ queryKey: messagesQueryKey(conversationId) });
      void queryClient.invalidateQueries({ queryKey: ["chats"] });
      void queryClient.invalidateQueries({ queryKey: unreadChatsQueryKey });
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send message.");
      return false;
    } finally {
      sendingRef.current = false;
      setIsSending(false);
    }
  }, [conversationId, queryClient]);

  return { sendMessage, isSending };
}
