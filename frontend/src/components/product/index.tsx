"use client";

import ProductMain from "./product-main";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { useProductStore } from "@/stores/useProductStore";
import ProductTabs from "./product-tabs";
import MoreProducts from "./more-products";

export default function Product({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const { getProductById } = useProductStore();

  useEffect(() => {
    getProductById(params.id).then(setProduct);
  }, [params.id, getProductById]);

  if (!product) return <div>Loading...</div>;

  return (
    <section>
      <ProductMain product={product} />
      <ProductTabs product={product} />
      <MoreProducts product={product} />
    </section>
  );
}
