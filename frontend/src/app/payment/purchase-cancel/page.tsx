"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PurchaseCancelPage() {
  return (
    <div className="container max-w-2xl py-20">
      <Card className="overflow-hidden bg-white shadow-lg">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-500 to-rose-600 p-6 text-center text-white">
            <XCircle className="mx-auto mb-4 h-12 w-12" />
            <h1 className="text-2xl font-bold">Payment Canceled</h1>
            <p className="mt-2 text-red-50">
              Your order has been canceled and no payment was processed.
            </p>
          </div>

          <div className="p-6">
            <div className="mb-8 rounded-lg border border-red-100 bg-red-50 p-4">
              <p className="text-center text-gray-700">
                Don&apos;t worry - your cart items are still saved. You can try
                again or continue shopping.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 border-t bg-gray-50 p-6">
            <Button asChild size="lg">
              <Link href="/checkout">Return to Checkout</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
