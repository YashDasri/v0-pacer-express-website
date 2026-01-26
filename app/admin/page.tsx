"use client";

import Link from "next/link";
import { AdminNavbar } from "@/components/admin-navbar";
import { ShoppingCart, Clock, Package, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Total Orders",
    value: "1",
    icon: ShoppingCart,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Pending Orders",
    value: "1",
    icon: Clock,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Total Products",
    value: "20",
    icon: Package,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Total Users",
    value: "4",
    icon: Users,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

const recentOrders = [
  {
    id: "#81608E38",
    total: 11.97,
    status: "Preparing",
  },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-800">DASHBOARD</h1>
            <p className="mt-2 text-slate-500">
              {"Welcome back! Here's what's happening today."}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.title}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Revenue */}
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Revenue</p>
                <p className="mt-2 text-4xl font-bold text-green-600">$11.97</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <DollarSign className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
              <Link href="/admin/orders">
                <Button variant="outline" size="sm" className="text-slate-600 border-slate-200 bg-white hover:bg-slate-50">
                  View All
                </Button>
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                  <span className="font-medium text-slate-800">{order.id}</span>
                  <div className="text-right">
                    <p className="font-bold text-slate-800">${order.total.toFixed(2)}</p>
                    <span className="text-sm text-yellow-600">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link href="/admin/products" className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Manage Products</h3>
                  <p className="text-sm text-slate-500">Add, edit, or remove products</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/orders" className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <ShoppingCart className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">View Orders</h3>
                  <p className="text-sm text-slate-500">Track and manage orders</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
