"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/stores/auth-store";

export default function GuestLayout({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);

  useEffect(() => {
    if (isAuthChecked && isAuthenticated) {
      router.replace("/drivers");
    }
  }, [isAuthChecked, isAuthenticated, router]);

  if (!isAuthChecked || isAuthenticated) {
    return null;
  }

  return (
    <main className="grid min-h-screen bg-card text-text-primary lg:grid-cols-[50.2%_49.8%]">
      <section aria-hidden="true" className="hidden min-h-screen bg-primary bg-cover bg-center lg:block" style={{ backgroundImage: "url('/images/signup-visual.png')" }} />
      <section className="flex min-h-screen items-center justify-center overflow-y-auto px-5 py-8 sm:px-8 lg:px-10">
        {children}
      </section>
    </main>
  );
}
