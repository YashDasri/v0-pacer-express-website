"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CartProvider, useCart } from "@/lib/cart-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const deliveryLocations = [
  "Student Activity Center",
  "Library",
  "Pacer Commons",
  "Business Building",
  "Science Building",
  "Arts Center",
  "Gym",
  "Nursing Building",
];

function CheckoutContent() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleSubmit = async () => {
    if (!selectedLocation || !name || !phone) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newOrderId = `#${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    setOrderId(newOrderId);
    setOrderPlaced(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="bg-slate-50 min-h-screen">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="mt-6 text-3xl font-bold text-slate-800">Order Placed!</h1>
              <p className="mt-2 text-slate-500">Your order {orderId} is being prepared</p>
              <p className="mt-4 text-sm text-slate-500">
                Delivering to: <span className="font-medium text-slate-700">{selectedLocation}</span>
              </p>
              <Button
                className="mt-8 bg-[#1e3a5f] text-white hover:bg-[#1e3a5f]/90"
                onClick={() => router.push("/shop")}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-black text-slate-800">CHECKOUT</h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Location */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                  <MapPin className="h-5 w-5 text-yellow-500" />
                  Select Delivery Location
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {deliveryLocations.map((location) => (
                    <button
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      type="button"
                      className={cn(
                        "rounded-xl border-2 p-4 text-left transition-all",
                        selectedLocation === location
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      )}
                    >
                      <span className={cn(
                        "font-medium",
                        selectedLocation === location ? "text-yellow-700" : "text-slate-700"
                      )}>
                        {location}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800">Contact Details</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Full Name *</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="bg-white border-slate-200 text-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700">Phone Number *</Label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(803) 555-0123"
                      className="bg-white border-slate-200 text-slate-800"
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label className="text-slate-700">Special Instructions (Optional)</Label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g., Call me when you arrive"
                    className="bg-white border-slate-200 text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800">Order Summary</h2>

                <div className="mt-4 divide-y divide-slate-100">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 py-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{item.name}</p>
                        <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-slate-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="text-slate-800">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Delivery</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-slate-800">Total</span>
                    <span className="text-lg font-bold text-slate-800">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">Cash on Delivery</p>
                </div>

                <Button
                  className="mt-6 w-full bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-semibold"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <CartProvider>
      <CheckoutContent />
    </CartProvider>
  );
}
