"use client";

import { useTranslations } from "next-intl";

export default function MessageInput({ recipient }: { recipient: string; conversationId?: string }) {
  const t = useTranslations("messages");
  return <form className="shrink-0 border-t border-border/30 bg-card px-3 py-3">
    <div className="flex items-center gap-2 rounded-2xl border border-border bg-secondary p-1.5">
      <button type="button" aria-disabled="true" title={t("attachmentsSoon")} className="grid size-8 shrink-0 place-items-center rounded-lg text-[#91a3bd]"><svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="m8 12 7-7a3 3 0 0 1 4 4L9 19a4.5 4.5 0 0 1-6-6L14 2m-4 10 5-5a1 1 0 0 1 2 2l-7 7a1 1 0 0 1-3-3l7-7"/></svg></button>
      <label className="min-w-0 flex-1"><span className="sr-only">{t("messageTo", { name: recipient })}</span><input readOnly aria-disabled="true" placeholder={t("messagePlaceholder", { name: recipient })} className="h-8 w-full min-w-0 bg-transparent text-[11px] text-text-primary outline-none placeholder:text-[#91a3bd]" /></label>
      <button type="button" aria-disabled="true" title={t("emojiSoon")} className="grid size-7 shrink-0 place-items-center rounded-lg text-[#91a3bd]"><svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="8"/><path d="M8 14s1 3 4 3 4-3 4-3M8 9h1m6 0h1"/></svg></button>
      <button type="button" aria-disabled="true" title={t("sendUnavailable")} className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-xl bg-primary px-3 text-[11px] font-medium text-primary-foreground">{t("send")}<svg aria-hidden="true" className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="m3 10 18-7-7 18-3-8-8-3Zm8 3L21 3"/></svg></button>
    </div>
  </form>;
}
