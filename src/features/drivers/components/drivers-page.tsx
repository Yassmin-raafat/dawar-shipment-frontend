"use client";

import DriverModal from "@/features/drivers/components/driver-modal";
import DriversTableSkeleton from "@/features/drivers/components/drivers-table-skeleton";
import DriversTable from "@/features/drivers/components/drivers-table";
import DriversToolbar from "@/features/drivers/components/drivers-toolbar";
import { useDrivers } from "@/features/drivers/hooks/use-drivers";
import { useMemo, useState } from "react";

const PAGE_SIZE = 10;

export default function DriversPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);
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
    <div className="mx-3 mb-3 flex min-h-[calc(100vh-92px)] flex-col rounded-xl bg-card px-5 py-5">
      <DriversToolbar
        onAddDriverClick={() => setIsAddDriverOpen(true)}
        onSearchChange={handleSearchChange}
        searchValue={searchQuery}
      />

      {isAddDriverOpen ? <DriverModal onClose={() => setIsAddDriverOpen(false)} /> : null}

      <section className="mt-7 flex flex-1 flex-col">
        {isLoading ? <DriversTableSkeleton rows={PAGE_SIZE} /> : null}

        {isError ? (
          <div className="rounded-[8px] border border-destructive/30 bg-destructive/5 px-5 py-10 text-center text-[14px] font-medium text-destructive">
            Could not load drivers. Try again later.
          </div>
        ) : null}

        {!isLoading && !isError ? (
          <>
            <DriversTable drivers={paginatedDrivers} />

            <div className="mt-auto pt-6 flex flex-col gap-3 text-[11px] text-text-secondary sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {filteredDrivers.length === 0 ? 0 : startIndex + 1}–{startIndex + paginatedDrivers.length} of {filteredDrivers.length} drivers
                {filteredDrivers.length !== drivers.length ? ` (filtered from ${drivers.length})` : ""}
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="h-9 rounded-[8px] border border-border px-3 font-semibold text-text-secondary disabled:cursor-not-allowed disabled:text-text-muted"
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                  type="button"
                >
                  Previous
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
                  Next
                </button>
              </div>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
