import AppHeader from "@/components/layout/app-header";
import AppSidebar from "@/components/layout/app-sidebar";
import ProtectedRoute from "@/features/auth/protected-route";
import DriversPage from "@/features/drivers/components/drivers-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drivers | Dawar Parcel",
};

export default function DriversRoutePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background text-text-primary lg:flex">
        <AppSidebar />
        <div className="min-w-0 flex-1">
          <AppHeader />
          <DriversPage />
        </div>
      </div>
    </ProtectedRoute>
  );
}
