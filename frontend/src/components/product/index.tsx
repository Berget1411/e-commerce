"use client";

import ProductMain from "./product-main";
import { useState, useEffect } from "react";
import { useProductStore } from "@/stores/useProductStore";
import { Product as ProductType } from "@/types/product";
import ProductTabs from "./product-tabs";
import MoreProducts from "./more-products";

export default function Product({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const { getProductById } = useProductStore();

  useEffect(() => {
    getProductById(params.id).then((product) => setProduct(product ?? null));
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
