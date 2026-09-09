import type { DataTableColumn } from "@/components/ui/data-table";
import type { Driver } from "@/features/drivers/types/driver";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export const driverColumns: DataTableColumn<Driver>[] = [
  {
    key: "driver",
    header: "Driver",
    cell: (driver) => (
      <div className="flex items-center gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-muted text-[13px] font-semibold text-primary">
          {getInitials(driver.name)}
        </div>
        <div>
          <p className="font-semibold text-text-primary">{driver.name}</p>
          <p className="mt-1 text-[12px] text-text-secondary">{driver.id}</p>
        </div>
      </div>
    ),
  },
  {
    key: "phone",
    header: "Phone",
    cell: (driver) => driver.phone,
  },
  {
    key: "vehicle",
    header: "Vehicle",
    cell: (driver) => driver.vehicle,
  },
  {
    key: "rating",
    header: "Rating",
    cell: (driver) => (
      <span className="inline-flex items-center gap-1 font-semibold">
        <span className="text-rating">★</span>
        {driver.rating.toFixed(1)}
      </span>
    ),
  },
  {
    key: "reliability",
    header: "Reliability",
    cell: (driver) => (
      <div className="flex min-w-[140px] items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-success"
            style={{ width: `${driver.reliability}%` }}
          />
        </div>
        <span className="w-9 text-right font-semibold">
          {driver.reliability}%
        </span>
      </div>
    ),
  },
];
