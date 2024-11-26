import { create } from "zustand";
import { CartItem } from "../types/cart";

type CartStore = {
  cartItems: CartItem[];
  setCartItems: (cartItems: CartItem[]) => void;
  fetchCartItems: () => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  setCartItems: (cartItems) => set({ cartItems }),
  fetchCartItems: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart`,
        {
          credentials: "include",
        },
      );

      const data = await response.json();
      console.log(data.cartItems);
      if (data.cartItems) {
        set({ cartItems: data.cartItems });
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  },
  addToCart: async (productId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ productId }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (data.cartItems) {
        set({ cartItems: data.cartItems });
      }
      console.log(data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  },
  removeFromCart: async (productId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart`,
        {
          method: "DELETE",
          credentials: "include",
          body: JSON.stringify({ productId }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      if (data.cartItems) {
        set({ cartItems: data.cartItems });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  },
  updateQuantity: async (productId: string, quantity: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/${productId}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({ quantity }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (data.cartItems) {
        set({ cartItems: data.cartItems });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  },
}));
