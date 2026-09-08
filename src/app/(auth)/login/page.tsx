import type { Metadata } from "next";
import LoginForm from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Login | Dawar Parcel",
};

export default function LoginPage() {
  return <LoginForm />;
}
