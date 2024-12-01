import { create } from "zustand";
import { loadStripe } from "@stripe/stripe-js";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { useCartStore } from "./useCartStore";
type OrderProduct = {
  product: string;
  quantity: number;
  price: number;
};

export type Order = {
  _id: string;
  totalAmount: number;
  products: OrderProduct[];
  stripeSessionId: string;
  user: string;
  createdAt: string;
  updatedAt: string;
};

export type CartProduct = {
  product: {
    _id: string;
    name: string;
    image: string;
  };
  quantity: number;
  price: number;
};

interface CheckoutResponse {
  id: string;
  totalAmount: number;
}

interface PaymentStore {
  isLoading: boolean;
  order: Order | undefined;
  orders: Order[] | undefined;
  error: string | undefined;
  orderProducts: CartProduct[];
  setIsLoading: (isLoading: boolean) => void;
  confirmOrder: (sessionId: string, products: Product[]) => Promise<void>;
  resetState: () => void;
  getOrders: () => Promise<void>;
  handlePayment: (products: CartItem[]) => Promise<CheckoutResponse>;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  isLoading: false,
  order: undefined,
  orders: undefined,
  error: undefined,
  orderProducts: [],

  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  resetState: () =>
    set({
      order: undefined,
      error: undefined,
      orderProducts: [],
      isLoading: false,
    }),

  confirmOrder: async (sessionId: string, products: Product[]) => {
    try {
      set({ isLoading: true });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/checkout-success`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to confirm order");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to process order");
      }

      const order = data.order as Order;
      useCartStore.getState().removeAllFromCart();

      const transformedProducts = order.products
        .map((orderProduct) => {
          const productDetails = products.find(
            (p) => p._id === orderProduct.product,
          );
          if (!productDetails) return null;

          return {
            product: {
              _id: productDetails._id,
              name: productDetails.name,
              image: productDetails.image,
            },
            quantity: orderProduct.quantity,
            price: orderProduct.price,
          };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null);

      set({
        order,
        orderProducts: transformedProducts,
        error: undefined,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to process order";
      set({ error: errorMessage });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },
  handlePayment: async (products: CartItem[]) => {
    try {
      set({ isLoading: true });

      // Only send product IDs and quantities to backend
      const checkoutProducts = products.map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity) || 1,
      }));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ products: checkoutProducts }),
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Payment failed: ${response.statusText}`,
        );
      }

      const data = await response.json();

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
      );

      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      return data as CheckoutResponse;
    } catch (error) {
      console.error("Payment processing error:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  getOrders: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/orders`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      set({ orders: data.orders });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get orders";
      set({ error: errorMessage });
      throw err;
    }
  },
}));
