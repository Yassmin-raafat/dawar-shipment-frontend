import DataTable from "@/components/ui/data-table";
import { driverColumns } from "@/features/drivers/components/driver-columns";
import type { Driver } from "@/features/drivers/types/driver";

type DriversTableProps = {
  drivers: Driver[];
};

export default function DriversTable({ drivers }: DriversTableProps) {
  return (
    <DataTable
      columns={driverColumns}
      data={drivers}
      emptyMessage="No drivers match your search."
      getRowKey={(driver) => driver.id}
    />
  );
}
