import type { Metadata } from "next";
import MessagesPage from "@/features/messages/components/messages-page";

export const metadata: Metadata = { title: "Messages | Dawar Parcel" };

export default function MessagesRoute() {
  return <MessagesPage />;
}
