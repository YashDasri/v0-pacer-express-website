"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const categoryColors: Record<string, string> = {
  snacks: "bg-slate-700",
  groceries: "bg-emerald-600",
  academic: "bg-blue-600",
  daily: "bg-purple-600",
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-md px-3 py-1 text-xs font-medium capitalize text-white",
            categoryColors[product.category]
          )}
        >
          {product.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-800">{product.name}</h3>
        <p className="mt-1 text-sm text-slate-500 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-yellow-600">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-[#1e3a5f] text-white hover:bg-[#1e3a5f]/90"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
