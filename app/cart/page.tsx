"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CartProvider, useCart } from "@/lib/cart-context";

function CartContent() {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="bg-slate-50 min-h-screen">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-md text-center">
              <ShoppingBag className="mx-auto h-20 w-20 text-slate-300" />
              <h1 className="mt-6 text-3xl font-bold text-slate-800">Your cart is empty</h1>
              <p className="mt-4 text-slate-500">
                Add some items from the shop to get started
              </p>
              <Link href="/shop">
                <Button className="mt-8 bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-semibold">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-black text-slate-800">YOUR CART</h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{item.name}</h3>
                      <p className="text-sm text-slate-500">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-600 hover:text-slate-800"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium text-slate-800">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-600 hover:text-slate-800"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="w-16 text-right font-semibold text-slate-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="mt-4 border-slate-200 text-slate-600 hover:bg-slate-100 bg-white"
                onClick={clearCart}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800">Order Summary</h2>

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Items ({items.length})</span>
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

                <Link href="/checkout">
                  <Button className="mt-6 w-full bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-semibold">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  );
}
