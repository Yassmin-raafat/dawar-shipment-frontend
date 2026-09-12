"use client";

import { useState } from "react";
import DataTable from "@/components/ui/data-table";
import { driverColumns } from "@/features/drivers/components/driver-columns";
import type { Driver } from "@/features/drivers/types/driver";

type DriversTableProps = {
  drivers: Driver[];
};

export default function DriversTable({ drivers }: DriversTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allSelected = drivers.length > 0 && drivers.every((driver) => selectedIds.includes(driver.id));
  const columns = driverColumns.map((column) => column.key === "selection" ? {
    ...column,
    header: <input aria-label="Select all drivers on this page" className="size-3.5 accent-primary" type="checkbox" checked={allSelected} onChange={(event) => setSelectedIds(event.target.checked ? drivers.map((driver) => driver.id) : [])} />,
    cell: (driver: Driver) => <input aria-label={"Select " + driver.name} className="size-3.5 accent-primary" type="checkbox" checked={selectedIds.includes(driver.id)} onChange={(event) => setSelectedIds((current) => event.target.checked ? [...current, driver.id] : current.filter((id) => id !== driver.id))} />,
  } : column);
  return (
    <DataTable
      columns={columns}
      data={drivers}
      emptyMessage="No drivers match your search."
      getRowKey={(driver) => driver.id}
    />
  );
}
