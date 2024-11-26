import { Product } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { LuHeart } from "react-icons/lu";
import { useCartStore } from "@/stores/useCartStore";

export default function ProductMain({ product }: { product: Product }) {
  const discountedPrice = Number(
    (product.price - (product.price * (product.discount ?? 0)) / 100).toFixed(
      2,
    ),
  );
  const { addToCart } = useCartStore();
  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <Button variant="link" className="p-0">
                <p className="text-lg text-muted-foreground">{product.brand}</p>
              </Button>
              <h1 className="text-3xl font-bold">{product.name}</h1>
            </div>
            <div className="flex flex-col-reverse items-end gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.rating ? "fill-primary" : "fill-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating
                  ? `${product.rating} out of 5`
                  : "No reviews yet"}
              </span>
            </div>
          </div>
          <div className="relative mt-2 flex items-center gap-2">
            {product.discount && product.discount > 0 ? (
              <>
                <p className="font-bold text-red-500">${discountedPrice}</p>
                <p className="text-xs text-muted-foreground line-through">
                  ${product.price}
                </p>
              </>
            ) : (
              <p className="font-bold">${product.price}</p>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-bold text-muted-foreground underline">
              {product.quantity} in stock
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              size="lg"
              className="w-full"
              onClick={() => addToCart(product._id)}
            >
              Add to Cart
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="aspect-square h-10 w-10"
            >
              <LuHeart className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
