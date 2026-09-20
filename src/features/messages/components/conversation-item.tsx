import { useTranslations } from "next-intl";
import ConversationAvatar from "./conversation-avatar";
import type { Conversation } from "@/features/messages/types/message";

export default function ConversationItem({ conversation, selected, onSelect }: {
  conversation: Conversation; selected: boolean; onSelect: () => void;
}) {
  const t = useTranslations("messages");
  return <li className="border-b border-border/20 last:border-0">
    <button type="button" onClick={onSelect} aria-pressed={selected} className={"flex w-full items-start gap-2.5 rounded-xl px-2.5 py-3 text-start outline-none transition focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40 " + (selected ? "bg-[#f3f8ff]" : "hover:bg-background")}>
      <ConversationAvatar conversation={conversation} />
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2"><span className={"truncate text-[11px] text-text-primary " + (selected ? "font-semibold" : "font-medium")}>{conversation.name}</span><span className={"shrink-0 text-[8px] " + (selected ? "text-primary" : "text-[#91a3bd]")}>{conversation.timestamp === "Just now" ? t("justNow") : conversation.timestamp === "Yesterday" ? t("yesterday") : conversation.timestamp}</span></span>
        <span className="mt-1 block text-[10px] leading-[1.5] text-[#7387a5]">{conversation.preview === "No messages yet." ? t("emptyPreview") : conversation.preview}</span>
        {conversation.unreadCount > 0 && <span aria-label={t("unreadCount", { count: conversation.unreadCount })} className="mt-1 ms-auto flex size-3.5 items-center justify-center rounded-full bg-primary text-[8px] text-primary-foreground">{conversation.unreadCount}</span>}
        <span className="sr-only">{conversation.online ? t("online") : t("offline")}</span>
      </span>
    </button>
  </li>;
}
