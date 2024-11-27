"use client";

import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
export default function CheckoutForm({
  totalAmount,
  totalItems,
}: {
  totalAmount: number;
  totalItems: number;
}) {
  const [delivery, setDelivery] = useState<string>("free");
  const [couponCode, setCouponCode] = useState("");
  const [totalAmountAfterTaxAndDelivery, setTotalAmountAfterTaxAndDelivery] =
    useState(totalAmount);
  const tax = 20;
  const taxAmount = Number(((totalAmount * tax) / 100).toFixed(2));
  const deliveryFee = delivery === "free" ? 0 : 9.99;

  useEffect(() => {
    setTotalAmountAfterTaxAndDelivery(
      Number((totalAmount + taxAmount + deliveryFee).toFixed(2)),
    );
  }, [delivery, totalAmount]);

  const getDeliveryDate = (type: string) => {
    const date = new Date();
    if (type === "free") {
      date.setDate(date.getDate() + 7); // Add 7 days for free delivery
    } else {
      date.setDate(date.getDate() + 2); // Add 2 days for express delivery
    }
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleApplyCoupon = () => {
    // TODO: Implement coupon logic
    console.log("Applying coupon:", couponCode);
  };

  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>Delivery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 inline-flex w-full rounded-lg border p-1">
          <Button
            variant={delivery === "free" ? "default" : "ghost"}
            onClick={() => setDelivery("free")}
            className="w-1/2 rounded-r-none"
          >
            Free
          </Button>
          <Button
            variant={delivery === "express" ? "default" : "ghost"}
            onClick={() => setDelivery("express")}
            className="w-1/2 rounded-l-none"
          >
            Express $9.99
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Expected delivery date: {getDeliveryDate(delivery)}
        </p>
        <Separator className="my-4" />
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="pr-20"
          />
          <Button
            onClick={handleApplyCoupon}
            variant="outline"
            className="absolute right-0 top-0 rounded-l-none"
          >
            Apply
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="space-y-1 text-muted-foreground">
          <div className="mb-2 flex justify-between text-base font-semibold">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Discount</p>
            <p>$0.00</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Delivery</p>
            <p>{delivery === "free" ? "$0.00" : "$9.99"}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Tax</p>
            <p>${taxAmount}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="mb-4 flex justify-between text-base font-semibold">
          <p>Total</p>
          <p>${totalAmountAfterTaxAndDelivery}</p>
        </div>
        <div className="space-y-2">
          <Button className="w-full">Checkout</Button>
          <Button variant="outline" className="w-full">
            <Link href="/home/products">Continue shopping</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
