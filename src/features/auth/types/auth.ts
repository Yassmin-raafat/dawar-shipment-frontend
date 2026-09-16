export type AuthUser = {
  name: string;
  email: string;
};

export type { LoginValues as LoginPayload } from "@/features/auth/schemas/login-schema";
