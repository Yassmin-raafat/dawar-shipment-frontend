import { z } from "zod";
import { emailSchema, requiredPasswordSchema } from "./auth-fields";

export const loginSchema = z.object({
  email: emailSchema,
  password: requiredPasswordSchema,
  rememberMe: z.boolean(),
});

export type LoginValues = z.infer<typeof loginSchema>;
