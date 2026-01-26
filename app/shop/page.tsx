"use client";

import React from "react"

import { useState, useMemo } from "react";
import { Search, ShoppingCart, Cookie, Apple, BookOpen, Droplet } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { CartProvider } from "@/lib/cart-context";
import { products, categories } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ReactNode> = {
  all: <ShoppingCart className="h-4 w-4" />,
  snacks: <Cookie className="h-4 w-4" />,
  groceries: <Apple className="h-4 w-4" />,
  academic: <BookOpen className="h-4 w-4" />,
  daily: <Droplet className="h-4 w-4" />,
};

function ShopContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-foreground">SHOP PRODUCTS</h1>
          <p className="mt-2 text-muted-foreground">
            Browse essentials from Pacer Market - delivered in 10 minutes
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "gap-2",
                  selectedCategory === category.id
                    ? "bg-[#1e3a5f] text-white hover:bg-[#1e3a5f]/90"
                    : "bg-card border-border text-foreground hover:bg-secondary"
                )}
              >
                {categoryIcons[category.id]}
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-xl font-semibold text-foreground">No products found</h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <CartProvider>
      <ShopContent />
    </CartProvider>
  );
}
