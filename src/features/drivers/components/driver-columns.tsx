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
    key: "selection",
    header: <span className="sr-only">Select drivers</span>,
    className: "w-12",
    cell: () => null,
  },
  {
    key: "driver",
    header: "Driver Profile",
    cell: (driver) => (
      <div className="flex items-center gap-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-muted text-[13px] font-semibold text-primary">
          {getInitials(driver.name)}
        </div>
        <div>
          <p className="font-semibold text-text-primary">{driver.name}</p>
          <p className="mt-1 text-[10px] text-text-muted">{driver.id}</p>
        </div>
      </div>
    ),
  },
  {
    key: "phone",
    header: "Contact Details",
    cell: (driver) => driver.phone,
  },
  {
    key: "vehicle",
    header: "Assigned Vehicle",
    cell: (driver) => driver.vehicle,
  },
  {
    key: "rating",
    header: "Rating & Reliability",
    cell: (driver) => (
      <div>
        <span className="inline-flex items-center gap-1 font-medium"><span className="text-rating">★</span>{driver.rating}</span>
        <p className="mt-0.5 text-[10px] text-text-muted">{driver.reliability}% on-time</p>
      </div>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    className: "w-20 text-center",
    cell: (driver) => (
      <details className="relative">
        <summary aria-label={"Actions for " + driver.name} className="cursor-pointer list-none text-text-muted [&::-webkit-details-marker]:hidden">•••</summary>
        <div className="absolute right-0 z-10 w-44 rounded-lg border border-border bg-card p-3 text-left shadow-lg">
          <a className="text-primary" href={"tel:" + driver.phone.replace(/\s/g, "")}>Call driver</a>
        </div>
      </details>
    ),
  },
];
