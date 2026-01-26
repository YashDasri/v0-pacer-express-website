import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/lib/cart-context";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          
          {/* How It Works Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
                  How Pacer Express Works
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Get what you need in just 3 simple steps
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">Browse & Select</h3>
                  <p className="mt-2 text-muted-foreground">
                    Explore snacks, groceries, academic supplies, and daily essentials from Pacer Market
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">Choose Location</h3>
                  <p className="mt-2 text-muted-foreground">
                    Select your delivery location anywhere on the USCA campus
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">Receive in 10 Min</h3>
                  <p className="mt-2 text-muted-foreground">
                    Your order is delivered straight to your door in just 10 minutes
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-card py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
                    Why Choose Pacer Express?
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Designed exclusively for the USCA community, we make campus life easier.
                  </p>

                  <div className="mt-8 space-y-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Lightning Fast</h3>
                        <p className="mt-1 text-muted-foreground">
                          10-minute delivery guarantee to any campus location
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Campus Exclusive</h3>
                        <p className="mt-1 text-muted-foreground">
                          Built specifically for USCA students, faculty, and staff
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Cash on Delivery</h3>
                        <p className="mt-1 text-muted-foreground">
                          Pay when your order arrives - no prepayment required
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link href="/shop">
                      <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Start Shopping Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=500&fit=crop"
                    alt="Students on campus"
                    className="rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <div className="rounded-3xl bg-[#1e3a5f] p-8 text-center lg:p-16">
                <h2 className="text-3xl font-bold text-white lg:text-4xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
                  Join the Pacer Express community and never walk to the store again. Free delivery
                  on all orders within the USCA campus.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Create Free Account
                    </Button>
                  </Link>
                  <Link href="/shop">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 bg-transparent"
                    >
                      Browse Products
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
