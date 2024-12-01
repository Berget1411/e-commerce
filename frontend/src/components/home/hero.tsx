"use client";
import { useProductStore } from "@/stores/useProductStore";
import { Product } from "@/types/product";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import HeroCard from "./hero-card";
import { AuroraBackground } from "../ui/aurora-background";

const STATS = [
  {
    label: "Brands",
    value: "1k+",
  },
  {
    label: "Shops",
    value: "2.5k",
  },
  {
    label: "Customers",
    value: "250k+",
  },
];

export default function Hero() {
  const { recommendedProducts } = useProductStore();
  const [productOnDisplay, setProductOnDisplay] = useState<Product | null>(
    null,
  );

  useEffect(() => {
    setProductOnDisplay(recommendedProducts[0]);
  }, [recommendedProducts]);

  return (
    <section id="home" className="max-container flex max-md:flex-col">
      <AuroraBackground className="absolute inset-0" />
      <div className="relative flex w-full flex-col items-center justify-center text-center md:w-3/5 md:items-start md:pt-20 md:text-left">
        <p className="text-lg text-primary md:text-xl">Our Summer Collection</p>
        <h1 className="mt-6 text-4xl font-bold md:mt-8 md:text-5xl lg:text-6xl">
          <span className="relative z-10 pr-4 md:pr-10 xl:whitespace-nowrap">
            The New Arrival
          </span>
          <br />
          <span className="mt-2 inline-block text-primary md:mt-3">Swift</span>
          Shoes
        </h1>
        <p className="text-slate-gray mb-8 mt-4 text-base leading-7 sm:max-w-sm md:mb-10 md:mt-6 md:text-lg">
          Discover Stylish shoe arrivals, quality comfort, and innovation for
          your active life.
        </p>
        <Link href="/home/products">
          <Button className="w-full sm:w-auto">Shop now</Button>
        </Link>
        <div className="mt-12 flex flex-wrap justify-center gap-8 md:mt-16 md:justify-start md:gap-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-2xl font-bold md:text-2xl lg:text-4xl">
                {stat.value}
              </p>
              <p className="text-slate-gray mt-1 text-base text-gray-500 md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center py-16 md:py-24">
        <div className="absolute inset-0 -z-10 rounded-full bg-secondary/80 blur-3xl" />
        <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-2xl" />
        <Link href={`/home/products/${productOnDisplay?._id}`}>
          <Image
            src={productOnDisplay?.image || ""}
            alt="shoe collection"
            width={400}
            height={400}
            className="aspect-square cursor-pointer rounded-xl object-contain transition-transform max-md:w-[200px]"
          />
        </Link>
        <div className="absolute -bottom-12 flex gap-2 overflow-x-auto px-4 sm:-bottom-20 md:-bottom-0 md:gap-4 lg:-bottom-16 lg:gap-6">
          {recommendedProducts.map((product) => (
            <HeroCard
              key={product._id}
              product={product}
              setProductOnDisplay={setProductOnDisplay}
              productOnDisplay={productOnDisplay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
