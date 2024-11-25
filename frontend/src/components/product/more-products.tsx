import { Product } from "@/types/product";
import { useProductStore } from "@/stores/useProductStore";
import { ProductCard } from "../products/product-card";
export default function MoreProducts({ product }: { product: Product }) {
  const { products } = useProductStore();
  const brand = product.brand;
  const category = product.category;

  const moreProducts = products
    .filter((p) => p.brand === brand && p.category === category)
    .slice(0, 4);

  return (
    <section className="mt-24">
      <h2 className="mb-4 text-2xl font-bold">More {brand} Products</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {moreProducts.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
}
