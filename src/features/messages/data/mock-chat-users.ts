import type { ChatUser } from "../types/chat-user";
import { mockConversations } from "./mock-conversations";

export const mockChatUsers: ChatUser[] = [
  ...mockConversations.map(({ id, name, initials, avatarColor, online, subtitle, shipmentId }) => ({ id, name, initials, avatarColor, online, subtitle, shipmentId })),
  { id: "salma", name: "Salma Ahmed", initials: "SA", avatarColor: "bg-[#e6ede5] text-[#46604a]", online: true, subtitle: "Recipient · Giza" },
  { id: "youssef", name: "Youssef Ali", initials: "YA", avatarColor: "bg-[#e2e9ef] text-[#476179]", online: false, subtitle: "Fleet Courier · Nasr City" },
];
