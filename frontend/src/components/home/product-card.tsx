import { Product } from "@/types/product";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ProductCard({
  product,
  setProductOnDisplay,
  productOnDisplay,
}: {
  product: Product;
  setProductOnDisplay: (product: Product) => void;
  productOnDisplay: Product;
}) {
  const handleProductCardClick = () => setProductOnDisplay(product);

  const isSelected = productOnDisplay?._id === product._id;

  return (
    <Card
      className={cn(
        "group cursor-pointer border-2 p-2 transition-all max-md:w-[100px]",
        isSelected && "border-primary",
      )}
      onClick={handleProductCardClick}
    >
      <CardContent className="p-0">
        <Image
          src={product.image}
          alt={product.name}
          width={120}
          height={120}
          className="aspect-square object-cover transition-transform"
        />
      </CardContent>
    </Card>
  );
}
