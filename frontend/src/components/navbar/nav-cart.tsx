"use client";

import { useCartStore } from "@/stores/useCartStore";
import { useProductStore } from "@/stores/useProductStore";
import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import CartProduct from "./cart-product";
import { Separator } from "@/components/ui/separator";

export default function NavCart() {
  const { cartItems, fetchCartItems } = useCartStore();
  const { products } = useProductStore();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const cartProducts = products.filter((product) =>
    cartItems.some((item) => item.productId === product._id),
  );

  const totalAmount = cartProducts.reduce((acc, product) => {
    const cartItem = cartItems.find((item) => item.productId === product._id);
    const price =
      product.discount && product.discount > 0
        ? product.price * (1 - product.discount / 100)
        : product.price;
    return acc + price * cartItem!.quantity;
  }, 0);

  const totalItems = cartProducts.reduce((acc, product) => {
    const cartItem = cartItems.find((item) => item.productId === product._id);
    return acc + cartItem!.quantity;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartProducts.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-start">Cart</SheetTitle>
          <Separator className="my-2" />
        </SheetHeader>
        <div className="mt-8">
          {cartProducts.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Your cart is empty
            </p>
          ) : (
            <div className="space-y-4">
              {cartProducts.map((product) => (
                <>
                  <CartProduct key={product._id} product={product} />
                  <Separator className="" />
                </>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between">
          <p className="font-bold">Total</p>
          <p className="font-bold">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="mt-4 flex gap-2">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Continue shopping
            </Button>
          </SheetClose>
          <Button className="w-full">
            <Link href="/checkout">Proceed to checkout</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
