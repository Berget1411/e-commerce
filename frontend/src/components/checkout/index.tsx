"use client";

import CheckoutForm from "./checkout-form";
import CheckoutProducts from "./checkout-products";
import { useCartStore } from "@/stores/useCartStore";
import { useProductStore } from "@/stores/useProductStore";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { cartItems, fetchCartItems } = useCartStore();
  const { products } = useProductStore();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const cartProducts = products.filter((product) =>
    cartItems.some((item) => item.productId === product._id),
  );

  const totalAmount = Number(
    cartProducts
      .reduce((acc, product) => {
        const cartItem = cartItems.find(
          (item) => item.productId === product._id,
        );
        const price =
          product.discount && product.discount > 0
            ? product.price * (1 - product.discount / 100)
            : product.price;
        return acc + price * cartItem!.quantity;
      }, 0)
      .toFixed(2),
  );

  const totalItems = cartProducts.reduce((acc, product) => {
    const cartItem = cartItems.find((item) => item.productId === product._id);
    return acc + cartItem!.quantity;
  }, 0);
  return (
    <div className="flex w-[1000px] gap-4 max-md:w-full max-md:flex-col max-md:px-4">
      <CheckoutProducts cartProducts={cartProducts} />
      <CheckoutForm totalAmount={totalAmount} totalItems={totalItems} />
    </div>
  );
}
