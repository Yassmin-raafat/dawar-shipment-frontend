import type { Metadata } from "next";
import MessagesPage from "@/features/messages/components/messages-page";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("messages");
  return { title: `${t("title")} | Dawar Parcel` };
}

export default function MessagesRoute() {
  return <MessagesPage />;
}
