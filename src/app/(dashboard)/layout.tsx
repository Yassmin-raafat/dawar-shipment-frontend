import type { ReactNode } from "react";
import AppHeader from "@/components/layout/app-header";
import AppSidebar from "@/components/layout/app-sidebar";
import ProtectedRoute from "@/features/auth/components/protected-route";

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background text-text-primary lg:flex">
        <AppSidebar />
        <div className="min-w-0 flex-1">
          <AppHeader />
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
