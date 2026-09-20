import { useTranslations } from "next-intl";

const errorKeys: Record<string, string> = {
  "You are offline. Reconnect and try again.": "offline",
  "Shipment not found. Please choose another shipment.": "missing",
  "This shipment is no longer available. Please choose another shipment.": "unavailable",
  "Driver not found.": "driverMissing",
};

export function useAssignmentError() {
  const t = useTranslations("shipmentAssignment");
  return (message?: string) => t(message && Object.hasOwn(errorKeys, message) ? errorKeys[message] : "assignError");
}
