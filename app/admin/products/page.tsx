"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { CartProvider } from "@/lib/cart-context";
import { products as initialProducts, type Product } from "@/lib/products";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categoryColors: Record<string, string> = {
  snacks: "bg-slate-600",
  groceries: "bg-emerald-600",
  academic: "bg-blue-600",
  daily: "bg-purple-600",
};

// Stock data for products
const stockData: Record<string, number> = {
  "1": 50,
  "2": 100,
  "3": 75,
  "4": 60,
  "5": 45,
  "6": 80,
  "7": 200,
  "8": 30,
  "9": 25,
  "10": 40,
  "11": 50,
  "12": 100,
  "13": 75,
  "14": 60,
  "15": 45,
  "16": 80,
  "17": 200,
  "18": 30,
  "19": 25,
  "20": 40,
};

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "snacks" as Product["category"],
    image: "",
  });

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        image: product.image,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "snacks",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                image: formData.image,
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image,
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-black text-slate-800">PRODUCTS</h1>
              <p className="mt-2 text-slate-500">Manage your product inventory</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#1e3a5f] text-white hover:bg-[#1e3a5f]/90"
                  onClick={() => handleOpenDialog()}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-slate-200">
                <DialogHeader>
                  <DialogTitle className="text-slate-800">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Product Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white border-slate-300 text-slate-800"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700">Description</Label>
                    <Input
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-white border-slate-300 text-slate-800"
                      placeholder="Enter product description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-700">Price ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="bg-white border-slate-300 text-slate-800"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value: Product["category"]) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger className="bg-white border-slate-300 text-slate-800">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="snacks">Snacks</SelectItem>
                          <SelectItem value="groceries">Groceries</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700">Image URL</Label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="bg-white border-slate-300 text-slate-800"
                      placeholder="https://..."
                    />
                  </div>
                  <Button
                    className="w-full bg-[#1e3a5f] text-white hover:bg-[#1e3a5f]/90"
                    onClick={handleSave}
                  >
                    {editingProduct ? "Save Changes" : "Add Product"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Products Table */}
          <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-semibold text-slate-800">{product.name}</p>
                            <p className="text-sm text-slate-500 line-clamp-1">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-md px-3 py-1 text-xs font-medium capitalize text-white ${categoryColors[product.category]}`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {stockData[product.id] || 50}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-md bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Available
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-500 hover:text-slate-700"
                            onClick={() => handleOpenDialog(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <CartProvider>
      <ProductsContent />
    </CartProvider>
  );
}
