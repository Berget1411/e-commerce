"use client";

import Navbar from "@/components/navbar";
import { useProductStore } from "@/stores/useProductStore";

export default function Home() {
  const { products, recommendedProducts } = useProductStore();
  console.log(recommendedProducts);
  return (
    <div>
      <Navbar />
      <main>
        <h1>Products</h1>
        <div>
          {products.map((product) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </div>
        <h2>Recommended Products</h2>
        <div>
          {recommendedProducts.map((product) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </div>
      </main>
    </div>
  );
}
