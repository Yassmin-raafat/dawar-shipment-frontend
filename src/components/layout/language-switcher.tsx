"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { setLocale } from "@/i18n/actions";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("Common");
  const [isPending, startTransition] = useTransition();
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative">
      <select
        aria-label={t("language")}
        aria-busy={isPending}
        className="h-9 rounded-full border border-border/60 bg-card px-3 text-xs text-text-primary disabled:opacity-60"
        value={locale}
        disabled={isPending}
        onChange={(event) => {
          const selectedLocale = event.target.value;
          setHasError(false);
          startTransition(async () => {
            try {
              await setLocale(selectedLocale);
            } catch {
              setHasError(true);
            }
          });
        }}
      >
        <option value="en" lang="en">{t("english")}</option>
        <option value="ar" lang="ar">{t("arabic")}</option>
      </select>
      {hasError && <p role="alert" className="absolute end-0 top-11 z-20 w-56 rounded-xl border border-border bg-card p-3 text-xs text-text-primary shadow-lg">{t("languageChangeError")}</p>}
    </div>
  );
}
