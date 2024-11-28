"use client";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";
import { ProductCard } from "../products/product-card";
import { useProductStore } from "@/stores/useProductStore";

export default function Liked() {
  const { likedProducts, getLikedProducts } = useUserStore();

  useEffect(() => {
    getLikedProducts();
    console.log("likedProducts", likedProducts);
  }, [getLikedProducts]);

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Liked Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {likedProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
