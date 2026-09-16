import type { Conversation } from "@/features/messages/types/message";

export default function ConversationAvatar({ conversation, small = false, showStatus = true }: {
  conversation: Pick<Conversation, "initials" | "avatarColor" | "online">; small?: boolean; showStatus?: boolean;
}) {
  return <span aria-hidden="true" className={"relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold " + conversation.avatarColor + (small ? " size-6 text-[8px]" : " size-9 text-[11px]")}>
    {conversation.initials}
    {showStatus && <span className={"absolute -bottom-px -right-px size-2.5 rounded-full border-2 border-card " + (conversation.online ? "bg-success" : "bg-slate-300")} />}
  </span>;
}
