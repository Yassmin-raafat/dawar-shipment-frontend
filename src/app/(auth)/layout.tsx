import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  // Shared auth layout will be added here.
  return <>{children}</>;
}
