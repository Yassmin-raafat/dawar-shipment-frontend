import type { Metadata } from "next"; import UserDetailsPage from "@/features/users/components/user-details-page";
export const metadata: Metadata = { title: "User details | Dawar Parcel" };
export default async function UserRoute({ params }: { params: Promise<{ id: string }> }) { return <UserDetailsPage id={(await params).id} />; }
