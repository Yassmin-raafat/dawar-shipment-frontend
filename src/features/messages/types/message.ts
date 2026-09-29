export type UserSummary = { id: string; name: string; profilePhotoUrl: string | null };

export type Message = { id: string; sender: string; text: string; timestamp: string; direction: "incoming" | "outgoing"; readAt: string | null };

export type MessageThread = { currentUser: UserSummary | null; targetUser: UserSummary | null; messages: Message[] };

export type Conversation = {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  preview: string;
  timestamp: string;
  unreadCount: number;
  subtitle: string;
  dateLabel: string;
  profilePhotoUrl: string | null;
};
