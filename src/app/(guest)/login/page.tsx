import type { Metadata } from "next";
import LoginForm from "@/features/auth/components/login-form";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth");
  return { title: t("title") };
}

export default function LoginPage() {
  return <LoginForm />;
}
