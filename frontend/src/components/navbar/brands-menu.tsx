"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProductStore } from "@/stores/useProductStore";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "../ui/button";

export default function BrandsMenu() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="text-sm font-semibold transition-opacity hover:opacity-80"
        >
          Brands
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[400px] w-48 overflow-y-auto">
        {brands.map((brand) => (
          <DropdownMenuItem key={brand} asChild>
            <Link
              href={`/home/products?brand=${encodeURIComponent(brand)}`}
              className="w-full"
            >
              {brand}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
