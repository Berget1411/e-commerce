"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types/product";
import { LuHeart } from "react-icons/lu";
import { TbShoppingBagPlus } from "react-icons/tb";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useUserStore } from "@/stores/useUserStore";
import { useProductStore } from "@/stores/useProductStore";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useCartStore } from "@/stores/useCartStore";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { likedProducts, getLikedProducts } = useUserStore();
  const { toggleLike } = useProductStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    getLikedProducts();
  }, [getLikedProducts]);

  const isLiked =
    likedProducts?.some((likedProduct) => likedProduct._id === product._id) ||
    false;

  const discountedPrice = Number(
    (product.price - (product.price * (product.discount ?? 0)) / 100).toFixed(
      2,
    ),
  );

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleLike(product._id);
  };

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product._id);
  };

  return (
    <Link href={`/home/products/${product._id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <div className="absolute right-2 top-2 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white hover:text-primary"
                onClick={handleAddToBag}
              >
                <TbShoppingBagPlus className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute left-2 top-2 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white hover:text-primary"
                onClick={handleLike}
              >
                <LuHeart className={cn("h-4 w-4", isLiked && "text-red-500")} />
              </Button>
            </div>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.discount > 0 && (
              <Badge
                className="absolute bottom-2 left-2 text-primary"
                variant="secondary"
              >
                - {product.discount}%
              </Badge>
            )}
          </div>
          <div className="mt-4 p-4">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <div className="relative mt-2 flex items-center gap-2">
              {product.discount > 0 ? (
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
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
