import { z } from "zod";

const optionalPhoto = z.file()
  .mime(["image/png", "image/jpeg"], "Use a PNG or JPG image.")
  .max(5 * 1024 * 1024, "Image must be 5 MB or smaller.")
  .optional();

export const addDriverSchema = z.object({
  name: z.string().trim().min(1, "Full name is required."),
  // Confirmed against POST /api/v1/admins/drivers: the API accepts Egyptian
  // mobile numbers in local format, e.g. 01234567890.
  phone: z.string().trim().min(1, "Phone number is required.")
    .regex(/^01\d{9}$/, "Phone number must be a valid Egyptian phone number"),
  nationalId: z.string().trim().min(1, "National ID / License is required."),
  hub: z.string().trim(),
  vehicle: z.string().trim().min(1, "Vehicle brand is required."),
  vehicleType: z.enum(["CAR", "VAN", "SCOOTER", "TRUCK"]),
  plateNumber: z.string().trim().min(1, "Plate number is required."),
  vehicleColor: z.string().trim(),
  driverPhoto: optionalPhoto,
  vehiclePhoto: optionalPhoto,
});

export type AddDriverPayload = z.infer<typeof addDriverSchema>;
// Older mock records can have no license or plate recorded yet.
export const updateDriverSchema = addDriverSchema.extend({
  nationalId: z.string().trim(),
  plateNumber: z.string().trim(),
});
export type AddDriverErrors = Partial<Record<keyof AddDriverPayload, string>>;

export function getDriverFieldErrors(error: z.ZodError): AddDriverErrors {
  const errors: AddDriverErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof AddDriverPayload;
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}
