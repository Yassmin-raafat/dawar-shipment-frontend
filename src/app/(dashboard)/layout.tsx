import type { ReactNode } from "react";
import AppHeader from "@/components/layout/app-header";
import AppSidebar from "@/components/layout/app-sidebar";
import ProtectedRoute from "@/features/auth/components/protected-route";

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ProtectedRoute>
      <div className="flex h-dvh overflow-hidden bg-background text-text-primary">
        <AppSidebar />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <AppHeader />
          <main className="min-h-0 flex-1 overflow-auto pb-3">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
