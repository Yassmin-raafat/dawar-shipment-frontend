import { io, type Socket } from "socket.io-client";
import { getAccessToken } from "@/features/auth/services/auth-storage";

const CHAT_SOCKET_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "https://parcel-api.environ-adapt.com"}/chat`;

let messagesSocket: Socket | null = null;

function addDevelopmentErrorLogging(socket: Socket) {
  if (process.env.NODE_ENV === "production") return;

  console.info("[messages-socket] connected state at initialization", socket.connected);
  socket.on("connect", () => console.info("[messages-socket] connect", JSON.stringify({ connected: socket.connected, id: socket.id })));
  socket.on("connect_error", (error) => {
    const details = error as Error & { description?: unknown; context?: unknown };
    console.error("[messages-socket] connect_error", JSON.stringify({
      connected: socket.connected,
      message: details.message,
      description: details.description,
      context: details.context,
    }));
  });
  socket.on("disconnect", (reason, description) => console.info("[messages-socket] disconnect", {
    connected: socket.connected,
    reason,
    description,
  }));
}

export function connectMessagesSocket(): Socket | null {
  if (typeof window === "undefined") return null;
  if (messagesSocket) return messagesSocket;

  const accessToken = getAccessToken();
  if (!accessToken) return null;

  messagesSocket = io(CHAT_SOCKET_URL, {
    auth: { token: accessToken },
    transports: ["websocket"],
  });
  addDevelopmentErrorLogging(messagesSocket);

  return messagesSocket;
}

export function disconnectMessagesSocket() {
  if (!messagesSocket) return;
  messagesSocket.disconnect();
  messagesSocket = null;
}

export function getMessagesSocket() {
  return messagesSocket;
}
