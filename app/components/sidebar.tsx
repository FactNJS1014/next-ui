"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  mdiViewDashboard,
  mdiFileDocument,
  mdiPoll,
  mdiAccountGroup,
  mdiCog,
} from "@mdi/js";
import Icon from "@mdi/react";

const navigation = [
  { name: "Dashboard", href: "/", icon: mdiViewDashboard },
  { name: "Documents", href: "/documents", icon: mdiFileDocument },
  { name: "Analytics", href: "/analytics", icon: mdiPoll },
  { name: "Team", href: "/team", icon: mdiAccountGroup },
  { name: "Settings", href: "/settings", icon: mdiCog },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col shadow bg-sidebar fixed">
      {/* Sidebar Header */}
      <div className="flex h-16 items-center shadow px-6">
        <h1 className="text-lg font-semibold text-sidebar-foreground">
          My App
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-400 text-white"
                  : "text-foreground hover:bg-primary-50 hover:text-foreground"
              }`}
            >
              <Icon path={item.icon} size={1} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="shadow p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-sm font-semibold">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">
              John Doe
            </span>
            <span className="text-xs text-muted-foreground">
              john@example.com
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
