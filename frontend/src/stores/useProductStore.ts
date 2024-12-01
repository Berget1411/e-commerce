import { create } from "zustand";
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";
import { Review } from "@/types/Review";
import { useUserStore } from "./useUserStore";
interface ProductStore {
  isLoading: boolean;
  products: Product[];
  recommendedProducts: Product[];
  setProducts: (products: Product[]) => void;
  setRecommendedProducts: () => void;
  fetchProducts: () => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Promise<Product | undefined>;
  createReview: (review: Review) => Promise<void>;
  updateReview: (review: Review) => Promise<void>;
  deleteReview: (reviewId: string, productId: string) => Promise<void>;
  currentProduct: Product | null;
  setCurrentProduct: (product: Product | null) => void;
  toggleLike: (productId: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  isLoading: false,
  products: [],
  recommendedProducts: [],
  setProducts: (products: Product[]) => set({ products }),
  setRecommendedProducts: () => {
    const allProducts = useProductStore.getState().products;
    const nikeProducts = allProducts.filter(
      (product) => product.brand === "Nike",
    );
    const shuffledNikeProducts = [...nikeProducts].sort(
      () => 0.5 - Math.random(),
    );
    const recommendedProducts = shuffledNikeProducts.slice(0, 3);
    set({ recommendedProducts });
  },
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
  getProductById: async (id: string): Promise<Product | undefined> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${id}`,
        {
          credentials: "include",
        },
      );
      const product = await response.json();
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      return undefined;
    }
  },
  createReview: async ({ rating, comment, productId }: Review) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reviews`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating, comment, productId }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message,
        });
        return;
      }

      set({ currentProduct: data.product });

      toast({
        title: "Success",
        description: data.message,
      });
    } catch (error) {
      console.error("Error creating review:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while creating your review",
      });
    }
  },
  updateReview: async ({ _id, rating, comment, productId }: Review) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reviews/${_id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating, comment, productId }),
        },
      );
      const { message, error, product } = await response.json();
      if (!response.ok) throw new Error(error);

      set({ currentProduct: product });

      toast({
        title: "Success",
        description: message,
      });
    } catch (error) {
      console.error("Error updating review:", error);
    }
  },
  deleteReview: async (reviewId: string, productId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reviews/${reviewId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        },
      );
      const { message, error, product } = await response.json();
      if (!response.ok) throw new Error(error);

      set({ currentProduct: product });

      toast({
        title: "Success",
        description: message,
      });
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  },
  currentProduct: null,
  setCurrentProduct: (product) => set({ currentProduct: product }),
  toggleLike: async (productId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/like/${productId}`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      const { message, error } = await response.json();
      if (!response.ok) throw new Error(error);

      await useUserStore.getState().getLikedProducts();

      toast({
        title: "Success",
        description: message,
      });
    } catch (error) {
      console.error("Error toggling like:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to toggle like",
      });
    }
  },
}));
