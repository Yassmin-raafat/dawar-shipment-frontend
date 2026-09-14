import { z } from "zod";
import { emailSchema, requiredPasswordSchema } from "./auth-fields";

export const signupSchema = z.object({
  firstName: z.string().refine((value) => Boolean(value.trim()), "First name is required."),
  lastName: z.string().refine((value) => Boolean(value.trim()), "Last name is required."),
  email: emailSchema,
  phone: z.string()
    .refine((value) => Boolean(value.trim()), "Phone number is required.")
    .regex(/^[0-9+\-\s()]{8,}$/, "Enter a valid phone number."),
  password: requiredPasswordSchema.min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string().min(1, "Confirm your password."),
  userRole: z.string().min(1, "Select a user role."),
}).refine((values) => values.confirmPassword === values.password, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export type SignupValues = z.infer<typeof signupSchema>;
