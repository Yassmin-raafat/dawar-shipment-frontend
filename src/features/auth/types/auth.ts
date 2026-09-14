export type AuthUser = {
  name: string;
  email: string;
};

export type { SignupValues as SignupPayload } from "@/features/auth/schemas/signup-schema";
export type { LoginValues as LoginPayload } from "@/features/auth/schemas/login-schema";
