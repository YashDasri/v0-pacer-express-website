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

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  // Simple auth stub: if not a deliverer, show quick login to become one
  if (role !== "deliverer") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg text-center">
          <h2 className="text-xl font-semibold text-foreground">Delivery Partner Login (Stub)</h2>
          <p className="mt-2 text-sm text-muted-foreground">Sign in as a delivery partner to see assigned orders.</p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              className="rounded bg-primary px-4 py-2 text-white"
              onClick={() => {
                localStorage.setItem("role", "deliverer");
                setRole("deliverer");
              }}
            >
              Sign in as Deliverer
            </button>
            <button
              className="rounded border border-border px-4 py-2"
              onClick={() => {
                localStorage.setItem("role", "admin");
                setRole("admin");
              }}
            >
              Continue as Admin (view-only)
            </button>
          </div>
        </div>
      </div>
    );
  }

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

        <div className="rounded-2xl bg-card p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-4 text-sm font-medium text-muted-foreground">Order ID</th>
                <th className="pb-4 text-sm font-medium text-muted-foreground">Location</th>
                <th className="pb-4 text-sm font-medium text-muted-foreground">Total</th>
                <th className="pb-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="pb-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="pb-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assigned.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="py-4 text-sm font-medium text-card-foreground">{order.id}</td>
                  <td className="py-4 text-sm text-muted-foreground">{order.location}</td>
                  <td className="py-4 text-sm text-card-foreground">${order.total.toFixed(2)}</td>
                  <td className="py-4 text-sm text-card-foreground">{order.status}</td>
                  <td className="py-4 text-sm text-muted-foreground">{order.date}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {order.status !== "In Transit" && order.status !== "Delivered" && (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, "In Transit")}
                        >
                          Mark In Transit
                        </Button>
                      )}
                      {order.status !== "Delivered" && (
                        <Button size="sm" onClick={() => updateOrderStatus(order.id, "Delivered")}>
                          Mark Delivered
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {assigned.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No assigned deliveries</p>
            </div>
          )}
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
