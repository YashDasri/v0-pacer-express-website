"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { CartProvider } from "@/lib/cart-context";
import { Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
}

const mockOrders: Order[] = [
  {
    id: "#81608E38",
    customer: "N/A",
    location: "Student Activity Center",
    total: 11.97,
    status: "Preparing",
    date: "Jan 25, 11:20 PM",
    items: [
      { name: "Doritos Nacho Cheese", quantity: 1, price: 3.99 },
      { name: "Coca-Cola 20oz", quantity: 2, price: 2.49 },
      { name: "Kind Bar Variety", quantity: 1, price: 2.99 },
    ],
  },
  {
    id: "#72819F42",
    customer: "Jane Smith",
    location: "Library",
    total: 8.49,
    status: "Delivered",
    date: "Jan 25, 10:45 PM",
    items: [
      { name: "Blue Pen 10-Pack", quantity: 1, price: 4.99 },
      { name: "Spiral Notebook", quantity: 1, price: 3.49 },
    ],
  },
  {
    id: "#63927G55",
    customer: "Mike Johnson",
    location: "Science Building",
    total: 15.98,
    status: "In Transit",
    date: "Jan 25, 11:05 PM",
    items: [
      { name: "Red Bull Energy", quantity: 2, price: 3.49 },
      { name: "Lay's Classic Chips", quantity: 1, price: 3.29 },
      { name: "Highlighter Set", quantity: 1, price: 5.99 },
    ],
  },
  {
    id: "#54836H66",
    customer: "Sarah Davis",
    location: "Pacer Commons",
    total: 6.48,
    status: "Delivered",
    date: "Jan 25, 9:30 PM",
    items: [
      { name: "Gatorade Blue", quantity: 2, price: 2.29 },
      { name: "Fresh Bananas", quantity: 1, price: 1.99 },
    ],
  },
  {
    id: "#45947I77",
    customer: "Alex Wilson",
    location: "Business Building",
    total: 22.47,
    status: "Cancelled",
    date: "Jan 25, 8:15 PM",
    items: [
      { name: "USB Flash Drive 32GB", quantity: 1, price: 9.99 },
      { name: "Phone Charger", quantity: 1, price: 12.99 },
    ],
  },
];

function OrdersContent() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status.toLowerCase() === filter);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-black text-slate-800">ORDERS</h1>
              <p className="mt-2 text-slate-500">Manage and track customer orders</p>
            </div>

            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px] bg-white border-slate-200 text-slate-700">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All Orders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="in transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders Table */}
          <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-6 py-4 font-medium text-slate-800">{order.id}</td>
                      <td className="px-6 py-4 text-slate-600">{order.customer}</td>
                      <td className="px-6 py-4 text-slate-600">{order.location}</td>
                      <td className="px-6 py-4 font-medium text-slate-800">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <Select
                          value={order.status}
                          onValueChange={(value: Order["status"]) =>
                            updateOrderStatus(order.id, value)
                          }
                        >
                          <SelectTrigger
                            className={`w-[130px] h-8 text-xs font-medium border-0 ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : order.status === "Preparing"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : order.status === "In Transit"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Preparing">Preparing</SelectItem>
                            <SelectItem value="In Transit">In Transit</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{order.date}</td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-500 hover:text-slate-700"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredOrders.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-slate-500">No orders found</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Details Dialog */}
          <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
            <DialogContent className="bg-white border-slate-200">
              <DialogHeader>
                <DialogTitle className="text-slate-800">
                  Order {selectedOrder?.id}
                </DialogTitle>
              </DialogHeader>
              {selectedOrder && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Customer</span>
                      <p className="font-medium text-slate-800">{selectedOrder.customer}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Location</span>
                      <p className="font-medium text-slate-800">{selectedOrder.location}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Date</span>
                      <p className="font-medium text-slate-800">{selectedOrder.date}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Status</span>
                      <p
                        className={`font-medium ${
                          selectedOrder.status === "Delivered"
                            ? "text-green-600"
                            : selectedOrder.status === "Preparing"
                              ? "text-yellow-600"
                              : selectedOrder.status === "In Transit"
                                ? "text-blue-600"
                                : "text-red-600"
                        }`}
                      >
                        {selectedOrder.status}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <h4 className="font-medium text-slate-800 mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-slate-600">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="text-slate-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between border-t border-slate-200 pt-4">
                      <span className="font-medium text-slate-800">Total</span>
                      <span className="font-bold text-slate-800">
                        ${selectedOrder.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
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
