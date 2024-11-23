import { create } from "zustand";
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";
interface ProductStore {
  isLoading: boolean;
  products: Product[];
  fetchProducts: () => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  isLoading: false,
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`,
        {
          credentials: "include",
        },
      );
      const products = await response.json();
      set({ products, isLoading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ isLoading: false });
    }
  },
  createProduct: async (product: Product) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        },
      );
      const { message, error } = await response.json();
      if (!response.ok) throw new Error(error);
      toast({
        title: "Success",
        description: message,
      });
      await useProductStore.getState().fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  },
  updateProduct: async (product: Product) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${product._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        },
      );
      const { message, error } = await response.json();
      if (!response.ok) throw new Error(error);
      toast({
        title: "Success",
        description: message,
      });
      await useProductStore.getState().fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  },
  deleteProduct: async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const { message, error } = await response.json();
      if (!response.ok) throw new Error(error);
      toast({
        title: "Success",
        description: message,
      });
      await useProductStore.getState().fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },
}));
