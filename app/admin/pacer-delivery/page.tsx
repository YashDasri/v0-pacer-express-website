"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { CartProvider } from "@/lib/cart-context";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Order {
  id: string;
  customer: string;
  location: string;
  total: number;
  status: "Preparing" | "In Transit" | "Delivered" | "Cancelled";
  date: string;
  items: { name: string; quantity: number; price: number }[];
  // assigned delivery partner id (simple mock)
  deliverer?: string;
}

// This page is intended for delivery partners — show only orders assigned to them
function DeliveryContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("orders") || "null");
      if (Array.isArray(saved) && saved.length > 0) {
        setOrders(saved);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Failed to load orders for delivery page:", err);
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "orders") {
        try {
          const newOrders = JSON.parse(e.newValue || "[]");
          if (Array.isArray(newOrders)) setOrders(newOrders);
        } catch (err) {
          console.error("Failed to parse orders from storage event:", err);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Simple auth stub: if not a deliverer, show a login form
  if (role !== "deliverer") {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      if (username === "delivery" && password === "delivery") {
        localStorage.setItem("role", "deliverer");
        setRole("deliverer");
      } else {
        setError("Invalid username or password");
      }
    };

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-foreground text-center">Pacer Delivery Login</h2>
          <p className="mt-2 text-sm text-muted-foreground text-center">Sign in with your delivery credentials</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Login</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                placeholder="login"
                autoComplete="username"
                aria-label="username"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                placeholder="password"
                autoComplete="current-password"
                aria-label="password"
              />
            </div>

            {error && <div className="text-sm text-destructive">{error}</div>}

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Sign in
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  localStorage.setItem("role", "admin");
                  setRole("admin");
                }}
              >
                Continue as Admin
              </Button>
            </div>

            <div className="text-xs text-muted-foreground text-center">Hint: login <span className="font-medium">delivery</span> / password <span className="font-medium">delivery</span></div>
          </form>
        </div>
      </div>
    );
  }

  // For this mock, assume current delivery partner id is 'deliverer-1'
  const currentDelivererId = "deliverer-1";
  const assigned = orders.filter((o) => o.deliverer === currentDelivererId || !o.deliverer);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    const updated = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order));
    setOrders(updated);
    try {
      localStorage.setItem("orders", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to persist orders to localStorage:", err);
    }
    if (selectedOrder?.id === orderId) setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Pacer Delivery</h1>
          <p className="mt-2 text-muted-foreground">Orders assigned to you for delivery</p>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <div className="space-y-4">
            {assigned.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No assigned deliveries</p>
              </div>
            )}

            {assigned.map((order) => (
              <article
                key={order.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start rounded-lg border border-border bg-background p-4 hover:shadow-sm transition-shadow"
              >
                {/* Left: id + location */}
                <div className="md:col-span-3">
                  <div className="text-sm font-medium text-card-foreground">{order.id}</div>
                  <div className="text-sm text-muted-foreground mt-1">{order.location}</div>
                  <div className="text-xs text-muted-foreground mt-2">{order.date}</div>
                </div>

                {/* Middle small: total + status badge */}
                <div className="md:col-span-2 flex flex-col items-start md:items-start">
                  <div className="text-sm font-medium text-card-foreground">${order.total.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground mt-1">{order.status}</div>
                </div>

                {/* Items */}
                <div className="md:col-span-5">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Order Items</div>
                  <ul className="divide-y divide-border/30">
                    {order.items.map((item, i) => (
                      <li key={i} className="py-1 flex justify-between items-center text-sm">
                        <span className="text-muted-foreground truncate pr-2">{item.name} x{item.quantity}</span>
                        <span className="text-card-foreground pl-2">${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: select */}
                <div className="md:col-span-2 flex flex-col items-end gap-2">
                  <div>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                      className={`rounded-md border border-border bg-background px-3 py-1 text-sm ${order.status === 'Delivered' ? 'opacity-60 cursor-not-allowed' : ''}`}
                      disabled={order.status === 'Delivered'}
                      aria-label={`Delivery status for order ${order.id}`}
                    >
                      <option value="Preparing">Preparing</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-card-foreground">Order {selectedOrder?.id}</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Location</span>
                    <p className="font-medium text-card-foreground">{selectedOrder.location}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date</span>
                    <p className="font-medium text-card-foreground">{selectedOrder.date}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium text-card-foreground mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="text-card-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

export default function DeliveryPage() {
  return (
    <CartProvider>
      <DeliveryContent />
    </CartProvider>
  );
}
