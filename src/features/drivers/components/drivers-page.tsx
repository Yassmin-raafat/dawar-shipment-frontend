"use client";

import DriverModal from "@/features/drivers/components/driver-modal";
import DriversTableSkeleton from "@/features/drivers/components/drivers-table-skeleton";
import DriversTable from "@/features/drivers/components/drivers-table";
import DriversToolbar from "@/features/drivers/components/drivers-toolbar";
import { useDrivers } from "@/features/drivers/hooks/use-drivers";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const PAGE_SIZE = 10;

export default function DriversPage() {
  const t = useTranslations("drivers");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { data: drivers = [], isError, isLoading } = useDrivers();

  const filteredDrivers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return drivers;
    }

    return drivers.filter((driver) => {
      return [
        driver.name,
        driver.phone,
        driver.vehicle,
        driver.id,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));
    });
  }, [drivers, searchQuery]);

  const pageCount = Math.max(1, Math.ceil(filteredDrivers.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedDrivers = filteredDrivers.slice(startIndex, startIndex + PAGE_SIZE);

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setPage(1);
  }

  return (
    <div className="mx-3 flex h-full min-h-0 flex-col overflow-hidden rounded-xl bg-card px-5 py-5">
      <DriversToolbar
        onAddDriverClick={() => { setSuccessMessage(""); setIsAddDriverOpen(true); }}
        onSearchChange={handleSearchChange}
        searchValue={searchQuery}
      />

      {successMessage && <p role="status" className="mt-3 shrink-0 text-xs text-success">{successMessage}</p>}
      {isAddDriverOpen ? <DriverModal onClose={() => setIsAddDriverOpen(false)} onSuccess={(driver) => setSuccessMessage(driver.name + " was added successfully.")} /> : null}

      <section className="mt-7 flex min-h-0 flex-1 flex-col">
        <div key={`${currentPage}:${searchQuery}`} role="region" aria-label={t("table")} tabIndex={0} className="min-h-0 flex-1 overflow-auto overscroll-contain focus-visible:outline-primary">
        {isLoading ? <DriversTableSkeleton rows={PAGE_SIZE} /> : null}

        {isError ? (
          <div role="alert" className="rounded-[8px] border border-destructive/30 bg-destructive/5 px-5 py-10 text-center text-[14px] font-medium text-destructive">
            {t("loadError")}
          </div>
        ) : null}

        {!isLoading && !isError ? <DriversTable drivers={paginatedDrivers} /> : null}
        </div>
        {!isLoading && !isError ? (
            <div className="flex shrink-0 flex-col gap-3 pt-6 text-[11px] text-text-secondary sm:flex-row sm:items-center sm:justify-between">
              <p>
                {t("showing", { from: filteredDrivers.length === 0 ? 0 : startIndex + 1, to: startIndex + paginatedDrivers.length, total: filteredDrivers.length })}
                {filteredDrivers.length !== drivers.length ? t("filteredFrom", { total: drivers.length }) : ""}
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="h-9 rounded-[8px] border border-border px-3 font-semibold text-text-secondary disabled:cursor-not-allowed disabled:text-text-muted"
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                  type="button"
                >
                  {t("previous")}
                </button>
                <span className="grid h-9 min-w-9 place-items-center rounded-[8px] bg-primary text-[13px] font-semibold text-primary-foreground">
                  {currentPage}
                </span>
                <button
                  className="h-9 rounded-[8px] border border-border px-3 font-semibold text-text-secondary disabled:cursor-not-allowed disabled:text-text-muted"
                  disabled={currentPage === pageCount}
                  onClick={() => setPage(currentPage + 1)}
                  type="button"
                >
                  {t("next")}
                </button>
              </div>
            </div>
        ) : null}
      </section>
    </div>
  );
}
