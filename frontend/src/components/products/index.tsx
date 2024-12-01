"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useProductStore } from "@/stores/useProductStore";
import { ProductCard } from "@/components/products/product-card";
import ProductFilter from "@/components/products/product-filter";
import { Input } from "@/components/ui/input";
import {
  defaultFilters,
  filterProducts,
  getUniqueValues,
  calculatePriceRange,
  type Filters,
} from "@/utils/product-filters";
import { getFiltersFromSearchParams } from "@/utils/url-params";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const { products, fetchProducts } = useProductStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const { filters: newFilters, searchQuery: newSearchQuery } =
      getFiltersFromSearchParams(searchParams);

    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));

    if (newSearchQuery) {
      setSearchQuery(newSearchQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    if (products.length) {
      const { min, max } = calculatePriceRange(products);
      setPriceRange({ min, max });
      setFilters((prev) => ({
        ...prev,
        minPrice: min,
        maxPrice: max,
      }));
    }
  }, [products]);

  const existingCategories = getUniqueValues(products, "category");
  const existingBrands = getUniqueValues(products, "brand");
  const existingTargetAudiences = getUniqueValues(products, "target_audience");
  const filteredProducts = filterProducts(products, filters, searchQuery);

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
              priceRange={priceRange}
              existingCategories={existingCategories}
              existingBrands={existingBrands}
              existingTargetAudiences={existingTargetAudiences}
            />
          </div>
        </aside>
        <main className="flex-1">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
