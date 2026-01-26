"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/lib/cart-context";
import { Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const mockUserOrders = [
  {
    id: "#81608E38",
    location: "Student Activity Center",
    total: 11.97,
    status: "Preparing",
    date: "Jan 25, 2026",
    time: "11:20 PM",
    items: [
      { name: "Doritos Nacho Cheese", quantity: 1, price: 3.99 },
      { name: "Coca-Cola 20oz", quantity: 2, price: 2.49 },
      { name: "Kind Bar Variety", quantity: 1, price: 2.99 },
    ],
  },
  {
    id: "#72819F42",
    location: "Library",
    total: 8.49,
    status: "Delivered",
    date: "Jan 24, 2026",
    time: "3:15 PM",
    items: [
      { name: "Blue Pen 10-Pack", quantity: 1, price: 4.99 },
      { name: "Spiral Notebook", quantity: 1, price: 3.49 },
    ],
  },
  {
    id: "#63927G55",
    location: "Science Building",
    total: 15.98,
    status: "Delivered",
    date: "Jan 22, 2026",
    time: "6:45 PM",
    items: [
      { name: "Red Bull Energy", quantity: 2, price: 3.49 },
      { name: "Lay's Classic Chips", quantity: 1, price: 3.29 },
      { name: "Highlighter Set", quantity: 1, price: 5.99 },
    ],
  },
];

const statusConfig = {
  Preparing: {
    icon: Clock,
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  "In Transit": {
    icon: Truck,
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
  },
  Delivered: {
    icon: CheckCircle,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/20",
  },
  Cancelled: {
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/20",
  },
};

function OrdersContent() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-foreground">MY ORDERS</h1>
          <p className="mt-2 text-muted-foreground">Track your delivery history</p>
        </div>

        {mockUserOrders.length > 0 ? (
          <div className="space-y-4">
            {mockUserOrders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;

              return (
                <div key={order.id} className="rounded-2xl bg-card p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full p-3 ${status.bgColor}`}>
                        <StatusIcon className={`h-6 w-6 ${status.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-card-foreground">{order.id}</span>
                          <span className={`text-sm font-medium ${status.color}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.date} at {order.time}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-card-foreground">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">{order.location}</p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Order Items:</p>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                        >
                          {item.name} x{item.quantity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {order.status === "Preparing" && (
                    <div className="mt-4 rounded-lg bg-primary/10 p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary animate-pulse" />
                        <span className="text-sm font-medium text-primary">
                          Your order is being prepared. Estimated delivery: 10 minutes
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="h-20 w-20 text-muted-foreground/50" />
            <h3 className="mt-4 text-xl font-semibold text-foreground">No orders yet</h3>
            <p className="mt-2 text-muted-foreground">
              Start shopping to see your orders here
            </p>
            <Link href="/shop">
              <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                Browse Products
              </Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function OrdersPage() {
  return (
    <CartProvider>
      <OrdersContent />
    </CartProvider>
  );
}
