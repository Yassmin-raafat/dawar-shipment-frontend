import ConversationAvatar from "./conversation-avatar";
import type { Conversation, Message } from "@/features/messages/types/message";

export default function MessageBubble({ message, conversation }: { message: Message; conversation: Conversation }) {
  const outgoing = message.direction === "outgoing";
  return <li className={"flex items-end gap-2.5 " + (outgoing ? "flex-row-reverse" : "")}>
    {outgoing ? <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-[#eee1dd] text-[8px] font-semibold text-[#81554a]">N</span>
      : <ConversationAvatar conversation={conversation} small showStatus={false} />}
    <div className="max-w-[85%] sm:max-w-[78%]">
      <p className={"rounded-2xl px-3.5 py-3 text-[11px] leading-[1.55] whitespace-pre-wrap wrap-anywhere " + (outgoing ? "bg-primary text-primary-foreground" : "bg-card text-[#34445f]")}>
        <span className="sr-only">{message.sender}: </span>{message.text}
      </p>
      <div className={"mt-1.5 flex items-center gap-1 px-1 text-[9px] text-[#91a3bd] " + (outgoing ? "justify-end" : "")}>
        <span>{message.timestamp}</span>
        {outgoing && <span aria-label="Read"><svg aria-hidden="true" className="size-3 text-primary" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="m2 10 4 4 8-8m-4 7 2 1 6-8"/></svg></span>}
      </div>
    </div>
  </li>;
}
