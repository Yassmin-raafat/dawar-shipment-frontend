import DawarLogo from "@/components/ui/dawar-logo";
import Link from "next/link";

const navigationItems = [
  {
    href: "/shipments",
    label: "Shipments",
  },
  {
    href: "/drivers",
    label: "Drivers",
  },
  {
    href: "/messages",
    label: "Messages",
  },
];

export default function AppSidebar() {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-border bg-sidebar px-6 py-7 lg:block">
      <DawarLogo />

      <nav className="mt-12 space-y-2" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <Link
            className={`block rounded-[8px] px-4 py-3 text-[14px] font-semibold transition ${
              item.href === "/drivers"
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-secondary hover:text-text-primary"
            }`}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
