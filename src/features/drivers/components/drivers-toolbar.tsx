import { useTranslations } from "next-intl";

type DriversToolbarProps = {
  onAddDriverClick: () => void;
  onSearchChange: (value: string) => void;
  searchValue: string;
};

export default function DriversToolbar({ onAddDriverClick, onSearchChange, searchValue }: DriversToolbarProps) {
  const t = useTranslations("drivers");
  return (
    <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative min-w-0 flex-1">
        <label className="sr-only" htmlFor="driversSearch">{t("searchLabel")}</label>
        <svg aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg>
        <input
          className="h-9 w-full min-w-0 rounded-xl border border-transparent bg-background pl-9 pr-4 text-[12px] text-text-primary outline-none transition placeholder:text-text-placeholder focus:border-ring focus:ring-2 focus:ring-primary/10"
          id="driversSearch"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t("searchPlaceholder")}
          type="search"
          value={searchValue}
        />
      </div>
      <button
        className="inline-flex h-9 items-center justify-center gap-2 shrink-0 rounded-[8px] bg-primary px-5 text-[12px] font-medium text-primary-foreground transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/25"
        onClick={onAddDriverClick}
        type="button"
      ><svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 20 20"><path d="M10 4v12M4 10h12"/></svg>{t("add")}</button>
    </div>
  );
}
