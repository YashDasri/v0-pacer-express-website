"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Moon, Sun, Menu, X, Package } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <AdminNavbar />;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PACER EXPRESS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/shop"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/shop" ? "text-primary" : "text-foreground"
              )}
            >
              Shop
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Moon className="h-5 w-5" />
          </Button>

          <Link href="/login" className="hidden md:block">
            <Button variant="ghost" className="text-sm font-medium">
              Login
            </Button>
          </Link>

          <Link href="/signup" className="hidden md:block">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Sign Up
            </Button>
          </Link>

          <Link href="/checkout" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="/shop"
              className="text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function AdminNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">PACER EXPRESS</span>
              <span className="ml-2 text-xs font-medium text-primary">ADMIN</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link href="/admin">
              <Button
                variant={pathname === "/admin" ? "secondary" : "ghost"}
                className="text-sm"
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button
                variant={pathname === "/admin/products" ? "secondary" : "ghost"}
                className="text-sm"
              >
                Products
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button
                variant={pathname === "/admin/orders" ? "secondary" : "ghost"}
                className="text-sm"
              >
                Orders
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/shop">
            <Button variant="outline" size="sm">
              View Store
            </Button>
          </Link>
          <Button variant="ghost" size="icon">
            <Moon className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
}
