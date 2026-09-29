import { useTranslations } from "next-intl";
import { getApiErrorMessage } from "@/lib/get-api-error-message";

const errorKeys: Record<string, string> = {
  "You are offline. Reconnect and try again.": "offline",
  "Shipment not found. Please choose another shipment.": "missing",
  "This shipment is no longer available. Please choose another shipment.": "unavailable",
  "Driver not found.": "driverMissing",
};

export function useAssignmentError() {
  const t = useTranslations("shipmentAssignment");
  return (error: unknown) => {
    const message = getApiErrorMessage(error, t("assignError"));
    return Object.hasOwn(errorKeys, message) ? t(errorKeys[message]) : message;
  };
}
