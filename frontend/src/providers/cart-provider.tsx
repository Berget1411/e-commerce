"use client";

import { useEffect } from "react";
import { useCartStore } from "@/stores/useCartStore";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { cartItems, fetchCartItems } = useCartStore();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return children;
}
