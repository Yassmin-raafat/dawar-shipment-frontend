"use client";

import DriversTable from "@/features/drivers/components/drivers-table";
import DriversToolbar from "@/features/drivers/components/drivers-toolbar";
import { useDrivers } from "@/features/drivers/hooks/use-drivers";
import { useMemo, useState } from "react";

export default function DriversPage() {
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

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-7 sm:px-8">
      <DriversToolbar
        isAddDriverOpen={isAddDriverOpen}
        onAddDriverClick={() => setIsAddDriverOpen(true)}
        onAddDriverClose={() => setIsAddDriverOpen(false)}
        onSearchChange={setSearchQuery}
        searchValue={searchQuery}
      />

      <section className="mt-7">
        {isLoading ? (
          <div className="rounded-[8px] border border-border bg-card px-5 py-10 text-center text-[14px] text-text-secondary">
            Loading drivers...
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-[8px] border border-destructive/30 bg-destructive/5 px-5 py-10 text-center text-[14px] font-medium text-destructive">
            Could not load drivers. Try again later.
          </div>
        ) : null}

        {!isLoading && !isError ? (
          <>
            <DriversTable drivers={filteredDrivers} />

            <div className="mt-5 flex flex-col gap-3 text-[13px] text-text-secondary sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {filteredDrivers.length} of {drivers.length} drivers
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="h-9 rounded-[8px] border border-border px-3 font-semibold text-text-muted"
                  disabled
                  type="button"
                >
                  Previous
                </button>
                <span className="grid h-9 min-w-9 place-items-center rounded-[8px] bg-primary text-[13px] font-semibold text-primary-foreground">
                  1
                </span>
                <button
                  className="h-9 rounded-[8px] border border-border px-3 font-semibold text-text-muted"
                  disabled
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
