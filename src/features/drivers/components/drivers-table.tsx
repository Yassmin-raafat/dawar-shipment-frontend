"use client";

import { useState } from "react";
import DataTable from "@/components/ui/data-table";
import { useDriverColumns } from "@/features/drivers/components/driver-columns";
import { useTranslations } from "next-intl";
import type { Driver } from "@/features/drivers/types/driver";

type DriversTableProps = {
  drivers: Driver[];
};

export default function DriversTable({ drivers }: DriversTableProps) {
  const t = useTranslations("drivers");
  const driverColumns = useDriverColumns();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allSelected = drivers.length > 0 && drivers.every((driver) => selectedIds.includes(driver.id));
  const columns = driverColumns.map((column) => column.key === "selection" ? {
    ...column,
    header: <input aria-label={t("selectAll")} className="size-3.5 accent-primary" type="checkbox" checked={allSelected} onChange={(event) => setSelectedIds(event.target.checked ? drivers.map((driver) => driver.id) : [])} />,
    cell: (driver: Driver) => <input aria-label={t("select", { name: driver.name })} className="size-3.5 accent-primary" type="checkbox" checked={selectedIds.includes(driver.id)} onChange={(event) => setSelectedIds((current) => event.target.checked ? [...current, driver.id] : current.filter((id) => id !== driver.id))} />,
  } : column);
  return (
    <DataTable
      columns={columns}
      data={drivers}
      emptyMessage={t("empty")}
      getRowKey={(driver) => driver.id}
    />
  );
}
