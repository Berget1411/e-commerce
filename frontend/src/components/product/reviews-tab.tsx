"use client";
import { useEffect } from "react";
import { useProductStore } from "@/stores/useProductStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { StarIcon } from "lucide-react";
import ReviewForm from "./review-form";
import ReviewCard from "./review-card";
import { type Review } from "@/types/Review";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { LuPlus } from "react-icons/lu";

export default function ReviewsTab({ product }: { product: Product }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { currentProduct, setCurrentProduct } = useProductStore();

  useEffect(() => {
    setCurrentProduct(product);
  }, [product, setCurrentProduct]);

  const displayProduct = currentProduct || product;
  const averageRating =
    displayProduct.reviews.reduce((sum, review) => sum + review.rating, 0) /
    displayProduct.reviews.length;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b pb-8">
        <div>
          <CardTitle className="text-xl">Customer Reviews</CardTitle>
          <CardDescription>
            {averageRating ? (
              <div className="mt-4 flex items-center gap-2 max-sm:flex-col max-sm:items-start">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span>
                  {averageRating.toFixed(1)} out of 5.0 based on{" "}
                  {displayProduct.reviews.length} reviews
                </span>
              </div>
            ) : (
              <p className="text-muted-foreground">No reviews yet</p>
            )}
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <LuPlus />
              <span className="max-sm:hidden">Write a Review</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
            </DialogHeader>
            <ReviewForm
              productId={displayProduct._id}
              onSuccess={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {displayProduct.reviews.length === 0 ? (
          <div className="flex h-full items-center justify-center pt-6">
            <p className="text-muted-foreground">No reviews yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {displayProduct.reviews.map((review) => (
              <div key={review._id} className="flex flex-col gap-2">
                <ReviewCard productId={displayProduct._id} review={review} />
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
