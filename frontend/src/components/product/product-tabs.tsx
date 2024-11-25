import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/product";
import DescriptionTab from "./description-tab";
import ReviewsTab from "./reviews-tab";

export default function ProductTabs({ product }: { product: Product }) {
  return (
    <Tabs defaultValue="description" className="mt-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <DescriptionTab product={product} />
      </TabsContent>
      <TabsContent value="reviews">
        <ReviewsTab product={product} />
      </TabsContent>
    </Tabs>
  );
}
