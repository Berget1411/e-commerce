"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Loader2, CheckCircle2, Package } from "lucide-react";
import Image from "next/image";

import { useProductStore } from "@/stores/useProductStore";
import { usePaymentStore } from "@/stores/usePaymentStore";

export default function PurchaseSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { products } = useProductStore();
  const { isLoading, error, order, orderProducts, confirmOrder, resetState } =
    usePaymentStore();

  useEffect(() => {
    if (!sessionId) {
      usePaymentStore.setState({ error: "Invalid session ID" });
      return;
    }

    confirmOrder(sessionId, products);

    return () => {
      resetState();
    };
  }, [sessionId, products, confirmOrder, resetState]);

  if (error) {
    return (
      <div className="container max-w-2xl py-20">
        <Card className="p-6">
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="text-gray-600">{error}</p>
            <Button asChild>
              <Link href="/products">Return to Products</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-20">
      <Card className="overflow-hidden bg-white shadow-lg">
        <div className="space-y-6">
          {isLoading ? (
            <div className="p-6 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin" />
              <p className="mt-4 text-gray-600">Processing your order...</p>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center text-white">
                <CheckCircle2 className="mx-auto mb-4 h-12 w-12" />
                <h1 className="text-2xl font-bold">
                  Thank you for your purchase!
                </h1>
                <p className="mt-2 text-green-50">
                  Your order has been successfully processed.
                </p>
              </div>
              {order && (
                <div className="p-6">
                  <div className="mb-8 rounded-lg border border-green-100 bg-green-50 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Order Total</p>
                        <p className="text-xl font-bold text-green-600">
                          ${order.totalAmount}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-mono text-sm text-gray-700">
                          {order._id}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b pb-4">
                      <Package className="h-5 w-5 text-gray-500" />
                      <h3 className="text-lg font-medium">Order Items</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {orderProducts?.map((item, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative h-20 w-20 overflow-hidden rounded-lg border bg-white shadow-sm">
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                fill
                                className="object-contain p-2"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">
                                {item.product.name}
                              </span>
                              <span className="mt-1 text-sm text-gray-500">
                                Quantity: {item.quantity}
                              </span>
                            </div>
                          </div>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center gap-4 border-t bg-gray-50 p-6">
                <Button size="lg" disabled>
                  View Orders
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/home/products">Continue Shopping</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
