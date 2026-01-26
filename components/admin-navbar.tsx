"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Bell, User, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

export function AdminNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eab308]">
              <Package className="h-5 w-5 text-[#1e3a5f]" />
            </div>
            <div>
              <span className="text-xl font-bold text-[#1e3a5f]">PACER EXPRESS</span>
              <span className="ml-2 text-xs font-medium text-[#eab308]">ADMIN</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || 
                (item.href !== "/admin" && pathname.startsWith(item.href));
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "gap-2 font-medium",
                      isActive
                        ? "bg-slate-100 text-[#1e3a5f]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#1e3a5f]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank">
              <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-[#1e3a5f]">
                <ExternalLink className="h-4 w-4" />
                View Store
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="text-slate-600 hover:text-[#1e3a5f]">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <User className="h-4 w-4" />
              <span>Admin User</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
