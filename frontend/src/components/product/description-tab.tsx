import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MdCategory } from "react-icons/md";
import { LuUsers, LuHash } from "react-icons/lu";
import { Product } from "@/types/product";

export default function DescriptionTab({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{product.description}</p>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <MdCategory className="h-5 w-5" />
            <span>{product.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <LuUsers className="h-5 w-5" />
            <span>{product.target_audience}</span>
          </div>
          <div className="flex items-center gap-2">
            <LuHash className="h-5 w-5" />
            <span>{product._id}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
