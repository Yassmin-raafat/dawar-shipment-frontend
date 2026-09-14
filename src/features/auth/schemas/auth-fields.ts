import { z } from "zod";

export const emailSchema = z.string()
  .refine((value) => Boolean(value.trim()), "Email is required.")
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address.");

export const requiredPasswordSchema = z.string().min(1, "Password is required.");
