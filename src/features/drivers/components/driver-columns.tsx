import type { DataTableColumn } from "@/components/ui/data-table";
import type { DriverListItem } from "@/features/drivers/types/driver";
import Link from "next/link";
import { useTranslations } from "next-intl";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function useDriverColumns(): DataTableColumn<DriverListItem>[] {
  const t = useTranslations("drivers");
  return [
  {
    key: "selection",
    header: <span className="sr-only">{t("selectDrivers")}</span>,
    className: "w-12",
    cell: () => null,
  },
  {
    key: "driver",
    header: t("profile"),
    cell: (driver) => (
      <div className="flex items-center gap-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-muted text-[13px] font-semibold text-primary">
          {getInitials(driver.name)}
        </div>
        <div>
          <Link href={"/drivers/" + encodeURIComponent(driver.userId)} className="font-semibold text-text-primary hover:text-primary focus-visible:outline-primary">{driver.name}</Link>
          <p className="mt-1 text-[10px] text-text-muted">{driver.id}</p>
        </div>
      </div>
    ),
  },
  {
    key: "phone",
    header: t("contact"),
    cell: (driver) => driver.phoneNumber,
  },
  {
    key: "vehicle",
    header: t("vehicle"),
    cell: (driver) => <><span>{driver.vehicleBrand}</span><p className="mt-0.5 text-[10px] text-text-muted">{driver.vehicleType} · {driver.plateNumber}</p></>,
  },
  {
    key: "rating",
    header: t("rating"),
    cell: (driver) => (
      <div>
        <span className="inline-flex items-center gap-1 font-medium"><span className="text-rating">★</span>{driver.rating}</span>
        <p className="mt-0.5 text-[10px] text-text-muted">{t(driver.status)}</p>
      </div>
    ),
  },
  {
    key: "status",
    header: t("status"),
    cell: (driver) => <span className={driver.status === "ACTIVE" ? "rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700" : "rounded-full bg-secondary px-2 py-1 text-[10px] font-medium text-text-secondary"}>{t(driver.status)}</span>,
  },
  ];
}
