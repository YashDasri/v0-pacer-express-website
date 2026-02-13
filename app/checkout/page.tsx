"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Clock, Package, Check, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CartProvider, useCart } from "@/lib/cart-context";
import { campusLocations } from "@/lib/products";
import { PaymentSection, type PaymentMethod } from "@/components/payment-section";

function CheckoutContent() {
  const router = useRouter();
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);

  const handleProcessPayment = async (method: PaymentMethod): Promise<boolean> => {
    if (!location) {
      alert("Please select a delivery location");
      return false;
    }

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In production, you would integrate with actual payment gateway
    console.log(`Processing ${method} payment of $${totalPrice.toFixed(2)}`);
    // build order object
    const order = {
      id: `#${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      customer: "Guest User",
      location,
      total: totalPrice,
      status: "Preparing",
      date: new Date().toLocaleString(),
      items: items.map((it) => ({ id: it.id, name: it.name, quantity: it.quantity, price: it.price })),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("orders") || "[]");
      existing.unshift(order);
      localStorage.setItem("orders", JSON.stringify(existing));
    } catch (err) {
      console.error("Failed to save order:", err);
    }

    setOrderPlaced(true);
    clearCart();
    return true;
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
              <Check className="h-10 w-10 text-emerald-500" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-foreground">Order Placed!</h1>
            <p className="mt-4 text-muted-foreground">
              Your order is being prepared and will be delivered to {location} in approximately 10
              minutes.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <Link href="/orders">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Track Your Order
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="outline" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground/50" />
            <h1 className="mt-6 text-3xl font-bold text-foreground">Your cart is empty</h1>
            <p className="mt-4 text-muted-foreground">
              Add some items from the shop to get started
            </p>
            <Link href="/shop">
              <Button className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
                Browse Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-black text-foreground">CHECKOUT</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Delivery Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Location Card */}
            <div className="rounded-2xl bg-card p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-card-foreground">Delivery Location</h2>
              </div>

              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Campus Location *</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      {campusLocations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="E.g., Room number, building entrance, landmarks..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-background border-border resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* 10-Minute Delivery Card */}
            <div className="rounded-2xl bg-primary/20 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">10-Minute Delivery</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your order will be delivered from Pacer Market directly to your campus location.
                    Choose your payment method below.
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Information Card */}
            <div className="rounded-2xl bg-card p-6">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-card-foreground">Customer Information</h2>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <span className="text-sm text-muted-foreground">Name</span>
                  <p className="font-medium text-card-foreground">Guest User</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Email</span>
                  <p className="font-medium text-card-foreground">guest@usca.edu</p>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="rounded-2xl bg-card p-6">
              <h2 className="text-lg font-semibold text-card-foreground">Cart Items</h2>
              <div className="mt-4 divide-y divide-border">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-card-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Section */}
            <PaymentSection
              totalPrice={totalPrice}
              selectedMethod={selectedPaymentMethod}
              onPaymentMethodChange={setSelectedPaymentMethod}
              onProcessPayment={handleProcessPayment}
              isProcessing={loading}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-card p-6">
              <h2 className="text-lg font-semibold text-card-foreground">Order Summary</h2>

              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-card-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-card-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium text-emerald-500">FREE</span>
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-card-foreground">Total</span>
                  <span className="text-lg font-bold text-card-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-emerald-500" />
                  Multiple Payment Options Available
                </div>
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
