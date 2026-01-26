"use client";

import Link from "next/link";
import { ArrowRight, Clock, MapPin, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Main Hero Card */}
          <div className="relative overflow-hidden rounded-3xl bg-[#1e3a5f] p-8 lg:p-12">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
                <ArrowRight className="h-4 w-4" />
                USCA EXCLUSIVE
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white lg:text-6xl">
                FROM STORE
                <br />
                <span className="text-primary">TO DOOR</span>
                <br />
                IN 10 MINS
              </h1>

              <p className="mt-6 max-w-md text-lg text-slate-300">
                Campus-exclusive instant delivery. Order snacks, groceries, and essentials from
                Pacer Market - delivered straight to you.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/shop">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  >
                    Start Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/10" />
            <div className="absolute -right-10 top-1/3 h-40 w-40 rounded-full bg-primary/5" />
          </div>

          {/* Hero Image Card */}
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop"
              alt="Student studying with snacks and supplies on campus"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-6 left-6 text-lg font-medium text-white">
              Everything you need, right on campus
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl bg-primary p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20">
              <Clock className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-primary-foreground">10-Minute Delivery</h3>
              <p className="text-sm text-primary-foreground/80">Lightning fast on-campus delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-card-foreground">Campus-Wide</h3>
              <p className="text-sm text-muted-foreground">Delivery to any USCA location</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-card-foreground">Pacer Market & Store</h3>
              <p className="text-sm text-muted-foreground">All your campus essentials</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
