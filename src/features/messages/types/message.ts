export type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  direction: "incoming" | "outgoing";
};

export type Conversation = {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  preview: string;
  timestamp: string;
  online: boolean;
  unreadCount: number;
  subtitle: string;
  shipmentId?: string;
  dateLabel: string;
};
