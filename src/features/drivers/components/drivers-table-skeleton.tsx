import DataTable, { type DataTableColumn } from "@/components/ui/data-table";
import { useDriverColumns } from "@/features/drivers/components/driver-columns";
import { useTranslations } from "next-intl";

function useSkeletonColumns(): DataTableColumn<number>[] {
  const driverColumns = useDriverColumns();
  return driverColumns.map((column) => ({
  key: column.key,
  header: column.header,
  className: column.className,
  cell: () => column.key === "driver" ? (
    <div className="flex items-center gap-3">
      <div className="size-10 shrink-0 rounded-full bg-secondary" />
      <div className="space-y-2">
        <div className="h-4 w-28 rounded bg-secondary" />
        <div className="h-3 w-16 rounded bg-secondary" />
      </div>
    </div>
  ) : (
    <div className="h-4 w-full min-w-16 rounded bg-secondary" />
  ),
  }));
}

export default function DriversTableSkeleton({ rows }: { rows: number }) {
  const t = useTranslations("drivers");
  const skeletonColumns = useSkeletonColumns();
  return (
    <div role="status" aria-label={t("searchLabel")}>
      <div aria-hidden="true" className="animate-pulse motion-reduce:animate-none">
        <DataTable columns={skeletonColumns} data={Array.from({ length: rows }, (_, i) => i)} getRowKey={String} />
      </div>
    </div>
  );
}
