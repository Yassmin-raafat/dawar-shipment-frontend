import { useTranslations } from "next-intl";

const errorKeys: Record<string, string> = {
  "Use a PNG or JPG image.": "photoType",
  "Image must be 5 MB or smaller.": "photoSize",
  "Full name is required.": "nameRequired",
  "Phone number is required.": "phoneRequired",
  "Enter a valid phone number.": "phoneInvalid",
  "Phone number must contain 8–15 digits.": "phoneLength",
  "National ID / License is required.": "idRequired",
  "Vehicle brand is required.": "vehicleRequired",
  "Plate number is required.": "plateRequired",
  "Could not read the photo. Please choose it again.": "photoRead",
  "A driver with this National ID / License already exists.": "duplicateId",
  "Driver not found.": "driverMissing",
};

export function useDriverFormError() {
  const t = useTranslations("driverForm");
  return (message?: string, fallback = "saveError") => t(message && Object.hasOwn(errorKeys, message) ? errorKeys[message] : fallback);
}
