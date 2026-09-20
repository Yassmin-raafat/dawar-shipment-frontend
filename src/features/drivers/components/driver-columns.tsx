import type { DataTableColumn } from "@/components/ui/data-table";
import type { Driver } from "@/features/drivers/types/driver";
import Image from "next/image";
import Link from "next/link";
import DriverActions from "@/features/drivers/components/driver-actions";
import { useTranslations } from "next-intl";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function useDriverColumns(): DataTableColumn<Driver>[] {
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
        {driver.avatarUrl ? <Image src={driver.avatarUrl} alt={driver.name} width={36} height={36} unoptimized className="size-9 shrink-0 rounded-full object-cover" /> : <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-muted text-[13px] font-semibold text-primary">
          {getInitials(driver.name)}
        </div>}
        <div>
          <Link href={"/drivers/" + encodeURIComponent(driver.id)} className="font-semibold text-text-primary hover:text-primary focus-visible:outline-primary">{driver.name}</Link>
          <p className="mt-1 text-[10px] text-text-muted">{driver.id}</p>
        </div>
      </div>
    ),
  },
  {
    key: "phone",
    header: t("contact"),
    cell: (driver) => driver.phone,
  },
  {
    key: "vehicle",
    header: t("vehicle"),
    cell: (driver) => driver.vehicle,
  },
  {
    key: "rating",
    header: t("rating"),
    cell: (driver) => (
      <div>
        <span className="inline-flex items-center gap-1 font-medium"><span className="text-rating">★</span>{driver.rating}</span>
        <p className="mt-0.5 text-[10px] text-text-muted">{t("onTime", { percent: driver.reliability })}</p>
      </div>
    ),
  },
  {
    key: "actions",
    header: t("actions"),
    className: "w-20 text-center",
    cell: (driver) => <DriverActions driver={driver} />,
  },
  ];
}
