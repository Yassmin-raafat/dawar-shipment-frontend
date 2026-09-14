import type { z } from "zod";

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function getFieldErrors<T>(error: z.ZodError<T>): FieldErrors<T> {
  const errors: FieldErrors<T> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof T | undefined;
    // Keep the first issue so required-field messages take precedence.
    if (field !== undefined && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}
