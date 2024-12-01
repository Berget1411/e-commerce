"use client";

import { Review } from "@/types/Review";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useUserStore } from "@/stores/useUserStore";
import { useProductStore } from "@/stores/useProductStore";
import { Button } from "../ui/button";
import ReviewForm from "./review-form";
import { useEffect, useState } from "react";
import { UserResponse } from "@/types/user";
import { Star } from "lucide-react";

export default function ReviewCard({
  productId,
  review,
}: {
  productId: string;
  review: Review;
}) {
  const { deleteReview } = useProductStore();
  const { user, getUserById } = useUserStore();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [reviewUser, setReviewUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const fetchReviewUser = async () => {
      if (!review.userId) return;
      const user = await getUserById(review.userId);
      setReviewUser(user);
    };
    fetchReviewUser();
  }, [review.userId, getUserById]);

  const handleDeleteReview = async () => {
    await deleteReview(review._id as string, productId);
  };

  return (
    <Card className="border-none p-0 shadow-none transition-all">
      <CardHeader className="space-y-2 px-0 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-1 font-bold">{reviewUser?.name || "Anonymous"}</p>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({review.rating}/5)
              </span>
            </div>
          </div>
          <span className="text-sm font-medium">
            {new Date(review.createdAt || "").toLocaleDateString()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <p className="text-sm leading-relaxed text-gray-600">
          {review.comment}
        </p>
      </CardContent>
      {user?._id === review.userId && (
        <CardFooter className="gap-2 px-0 pb-4">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Review</DialogTitle>
              </DialogHeader>
              <ReviewForm
                productId={productId}
                existingReview={{
                  _id: review._id as string,
                  rating: review.rating,
                  comment: review.comment,
                }}
                onSuccess={() => setIsEditDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <Button onClick={handleDeleteReview} variant="destructive" size="sm">
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
