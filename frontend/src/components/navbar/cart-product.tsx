import { Product } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Heart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useProductStore } from "@/stores/useProductStore";
import { useUserStore } from "@/stores/useUserStore";
export default function CartProduct({ product }: { product: Product }) {
  const { cartItems, updateQuantity, removeFromCart } = useCartStore();
  const { toggleLike } = useProductStore();
  const { likedProducts } = useUserStore();
  const cartItem = cartItems.find((item) => item.productId === product._id);
  const quantity = cartItem?.quantity || 0;

  const discountedPrice = Number(
    (product.price - (product.price * (product.discount ?? 0)) / 100).toFixed(
      2,
    ),
  );
  const isLiked = likedProducts.some((p) => p._id === product._id);

  return (
    <div key={product._id} className="flex items-center gap-4">
      <div className="rounded-lg bg-muted p-4 max-sm:p-2">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="h-20 w-20 rounded object-contain max-sm:h-16 max-sm:w-16"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{product.name}</h4>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleLike(product._id)}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "text-red-500" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => removeFromCart(product._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative mt-2 flex items-center gap-2">
          {product.discount && product.discount > 0 ? (
            <>
              <p className="text-sm font-bold text-red-500">
                ${discountedPrice}
              </p>
              <p className="text-xs text-muted-foreground line-through">
                ${product.price}
              </p>
            </>
          ) : (
            <p className="text-sm font-bold">${product.price}</p>
          )}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(product._id, quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(product._id, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
