import Link from "next/link";
import { Package } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">PACER EXPRESS</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Campus-exclusive instant delivery platform built for the University of South Carolina
              Aiken community. Serving students, faculty, and staff with fast and convenient
              ordering of essentials.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-sm text-muted-foreground hover:text-primary">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-sm text-muted-foreground hover:text-primary">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Pacer Express. Exclusively for USCA Campus.
          </p>
        </div>
      </div>
    </footer>
  );
}
