"use client";

import { useEffect } from "react";
import { useProductStore } from "@/stores/useProductStore";

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const { fetchProducts, setRecommendedProducts } = useProductStore();
  useEffect(() => {
    fetchProducts().then(() => setRecommendedProducts());
  }, [fetchProducts, setRecommendedProducts]);

  return children;
}
