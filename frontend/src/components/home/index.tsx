"use client";

import Navbar from "@/components/navbar";
import Hero from "./hero";
import { useProductStore } from "@/stores/useProductStore";

export default function Home() {
  const { products, recommendedProducts } = useProductStore();
  console.log(recommendedProducts);
  return (
    <div>
      <Navbar />
      <main className="container mx-auto py-10">
        <Hero />
      </main>
    </div>
  );
}
