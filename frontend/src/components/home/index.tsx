"use client";

import Navbar from "@/components/navbar";
import Hero from "./hero";
import Footer from "@/components/footer";
import { useProductStore } from "@/stores/useProductStore";
import { AuroraBackground } from "../ui/aurora-background";

export default function Home() {
  const { products, recommendedProducts } = useProductStore();
  console.log(recommendedProducts);
  return (
    <main className="container mx-auto py-10">
      <Hero />
    </main>
  );
}
