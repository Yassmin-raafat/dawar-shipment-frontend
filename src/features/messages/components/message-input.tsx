"use client";

import { useMessageError } from "@/features/messages/hooks/use-message-error";

import { useTranslations } from "next-intl";

import { useRef, useState, type FormEvent } from "react";
import { useSendMessage } from "@/features/messages/hooks/use-send-message";

export default function MessageInput({ recipient, conversationId }: { recipient: string; conversationId: string }) {
  const t = useTranslations("messages");
  const translateError = useMessageError();
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const draft = drafts[conversationId] ?? "";
  const mutation = useSendMessage();
  const submitting = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const showError = mutation.isError && mutation.variables?.conversationId === conversationId;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim() || submitting.current || mutation.isPending) return;
    submitting.current = true;
    try {
      await mutation.mutateAsync({ conversationId, text: draft });
      setDrafts((current) => ({ ...current, [conversationId]: "" }));
      inputRef.current?.focus();
    } catch {
      // Keep the draft; the mutation supplies an inline error and retry is manual.
    } finally { submitting.current = false; }
  }

  return <form onSubmit={submit} aria-busy={mutation.isPending} className="shrink-0 border-t border-border/30 bg-card px-3 py-3">
    <div className="flex items-center gap-2 rounded-2xl border border-[#edf1f6] bg-[#f5f7fb] p-1.5">
      <button type="button" aria-label={t("attach")} aria-disabled="true" title={t("attachmentsSoon")} className="grid size-8 shrink-0 place-items-center rounded-lg text-[#91a3bd]">
        <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="m8 12 7-7a3 3 0 0 1 4 4L9 19a4.5 4.5 0 0 1-6-6L14 2m-4 10 5-5a1 1 0 0 1 2 2l-7 7a2 2 0 0 1-3-3l7-7"/></svg>
      </button>
      <label className="min-w-0 flex-1"><span className="sr-only">{t("messageTo", { name: recipient })}</span><input ref={inputRef} value={draft} readOnly={mutation.isPending} aria-describedby={showError ? "send-message-error" : undefined} onChange={(event) => { setDrafts((current) => ({ ...current, [conversationId]: event.target.value })); if (mutation.isError) mutation.reset(); }} onKeyDown={(event) => { if (event.key === "Enter" && event.nativeEvent.isComposing) event.preventDefault(); }} placeholder={t("messagePlaceholder", { name: recipient })} className="h-8 w-full min-w-0 bg-transparent text-[11px] text-text-primary outline-none placeholder:text-[#91a3bd] focus-visible:ring-2 focus-visible:ring-primary/20" /></label>
      <button type="button" aria-label={t("emoji")} aria-disabled="true" title={t("emojiSoon")} className="grid size-7 shrink-0 place-items-center rounded-lg text-[#91a3bd]">
        <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="8"/><path d="M8 14s1 3 4 3 4-3 4-3M8 9h1m6 0h1"/></svg>
      </button>
      <button type="submit" disabled={!draft.trim() || mutation.isPending} className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-xl bg-primary px-3 text-[11px] font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60">{mutation.isPending ? t("sending") : t("send")}
        <svg aria-hidden="true" className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="m3 10 18-7-7 18-3-8-8-3Zm8 3L21 3"/></svg>
      </button>
    </div>
    {showError && <p id="send-message-error" role="alert" className="mt-2 text-[11px] text-destructive">{translateError(mutation.error.message, "sendError")}</p>}
  </form>;
}
