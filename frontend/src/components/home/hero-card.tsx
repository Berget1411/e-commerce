import { Product } from "@/types/product";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function HeroCard({
  product,
  setProductOnDisplay,
  productOnDisplay,
}: {
  product: Product;
  setProductOnDisplay: (product: Product) => void;
  productOnDisplay: Product | null;
}) {
  const handleProductCardClick = () => setProductOnDisplay(product);

  const isSelected = productOnDisplay?._id === product._id;

  return (
    <div
      className={cn(
        "group cursor-pointer rounded-lg border-2 p-2 transition-all max-md:w-[100px]",
        isSelected && "border-primary",
      )}
      onClick={handleProductCardClick}
    >
      <Image
        src={product.image}
        alt={product.name}
        width={120}
        height={120}
        className="aspect-square object-contain transition-transform"
      />
    </div>
  );
}
