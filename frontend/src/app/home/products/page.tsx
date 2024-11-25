"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/useProductStore";
import { ProductCard } from "@/components/products/product-card";
import ProductFilter from "@/components/products/product-filter";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const { products, fetchProducts } = useProductStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    targetAudience: "",
    minPrice: 0,
    maxPrice: 1000,
    onSale: false,
    sortBy: "newest" | "highest-price" | "lowest-price",
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (products.length) {
      const prices = products.map((p) => p.price);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));

      setPriceRange({ min, max });
      setFilters((prev) => ({
        ...prev,
        minPrice: min,
        maxPrice: max,
      }));
    }
  }, [products]);

  const existingCategories = Array.from(
    new Set(products.map((p: Product) => p.category)),
  );
  const existingBrands = Array.from(
    new Set(products.map((p: Product) => p.brand)),
  );
  const existingTargetAudiences = Array.from(
    new Set(products.map((p: Product) => p.target_audience)),
  );

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !filters.category || product.category === filters.category;
      const matchesBrand = !filters.brand || product.brand === filters.brand;
      const matchesAudience =
        !filters.targetAudience ||
        product.target_audience === filters.targetAudience;
      const matchesPrice =
        product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const matchesSale =
        !filters.onSale || (filters.onSale && product.discount > 0);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesAudience &&
        matchesPrice &&
        matchesSale
      );
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "highest-price":
          return b.price - a.price;
        case "lowest-price":
          return a.price - b.price;
        case "newest":
        default:
          return new Date(b._id).getTime() - new Date(a._id).getTime();
      }
    });

  return (
    <div className="mx-auto py-8">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start">
        <aside className="w-full md:w-64">
          <div className="sticky top-8 space-y-6">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />
            <ProductFilter
              filters={filters}
              setFilters={setFilters}
              priceRange={{ min: priceRange.min, max: priceRange.max }}
              existingCategories={existingCategories}
              existingBrands={existingBrands}
              existingTargetAudiences={existingTargetAudiences}
            />
          </div>
        </aside>
        <main className="flex-1">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
