"use client";

import { Navbar } from "@/components/navbar";
import { CartProvider } from "@/lib/cart-context";
import { Package, ShoppingBag, DollarSign, Clock, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Orders",
    value: "156",
    change: "+12%",
    icon: Package,
  },
  {
    title: "Revenue",
    value: "$2,847",
    change: "+8%",
    icon: DollarSign,
  },
  {
    title: "Active Orders",
    value: "12",
    change: "+3",
    icon: Clock,
  },
  {
    title: "Products",
    value: "20",
    change: "0",
    icon: ShoppingBag,
  },
];

const recentOrders = [
  {
    id: "#81608E38",
    customer: "John Doe",
    location: "Student Activity Center",
    total: 11.97,
    status: "Preparing",
    time: "2 min ago",
  },
  {
    id: "#72819F42",
    customer: "Jane Smith",
    location: "Library",
    total: 8.49,
    status: "Delivered",
    time: "15 min ago",
  },
  {
    id: "#63927G55",
    customer: "Mike Johnson",
    location: "Science Building",
    total: 15.98,
    status: "In Transit",
    time: "8 min ago",
  },
];

function AdminContent() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Here's an overview of your store.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="mt-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground">
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Order ID</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Customer</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Location</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Total</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border last:border-0">
                        <td className="py-4 text-sm font-medium text-card-foreground">
                          {order.id}
                        </td>
                        <td className="py-4 text-sm text-muted-foreground">{order.customer}</td>
                        <td className="py-4 text-sm text-muted-foreground">{order.location}</td>
                        <td className="py-4 text-sm text-card-foreground">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              order.status === "Delivered"
                                ? "bg-emerald-500/20 text-emerald-500"
                                : order.status === "Preparing"
                                  ? "bg-primary/20 text-primary"
                                  : "bg-blue-500/20 text-blue-500"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-muted-foreground">{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground">
                Popular Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Doritos Nacho Cheese", sales: 45 },
                  { name: "Coca-Cola 20oz", sales: 38 },
                  { name: "Blue Pen 10-Pack", sales: 32 },
                  { name: "Red Bull Energy", sales: 28 },
                ].map((product, i) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
                        {i + 1}
                      </span>
                      <span className="text-sm text-card-foreground">{product.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{product.sales} sold</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground">
                Top Delivery Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Student Activity Center", orders: 42 },
                  { name: "Library", orders: 35 },
                  { name: "Pacer Commons", orders: 28 },
                  { name: "Science Building", orders: 22 },
                ].map((location, i) => (
                  <div key={location.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
                        {i + 1}
                      </span>
                      <span className="text-sm text-card-foreground">{location.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{location.orders} orders</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  return (
    <CartProvider>
      <AdminContent />
    </CartProvider>
  );
}
