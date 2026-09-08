import type { Metadata } from "next";
import SignupForm from "@/features/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign Up | Dawar Parcel",
};

export default function SignupPage() {
  return <SignupForm />;
}
