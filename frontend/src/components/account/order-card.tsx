import { Order } from "@/stores/usePaymentStore";
import Link from "next/link";

export default function OrderCard({ order }: { order: Order }) {
  return (
    <Link
      key={order._id}
      href={`/payment/purchase-success?session_id=${order.stripeSessionId}`}
      className="block transition-colors hover:bg-gray-50"
    >
      <div className="rounded-lg border p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              Order #{order._id.slice(-6)}
            </span>
            <span className="mt-1 text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <span className="text-lg font-semibold text-green-600">
            ${order.totalAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span>Click to view details</span>
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
