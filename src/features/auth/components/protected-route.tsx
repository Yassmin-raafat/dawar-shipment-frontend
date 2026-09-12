"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/stores/auth-store";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  const isAuthChecked = useAuthStore(
    (state) => state.isAuthChecked,
  );

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthChecked, isAuthenticated, router]);

  if (!isAuthChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-text-secondary">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-text-secondary">
          Redirecting to login...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}