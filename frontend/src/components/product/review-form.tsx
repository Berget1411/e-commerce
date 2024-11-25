"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { reviewSchema } from "@/validation/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Star } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useProductStore } from "@/stores/useProductStore";
type ReviewFormFields = z.infer<typeof reviewSchema>;

type ReviewFormProps = {
  productId: string;
  existingReview?: {
    _id: string;
    rating: number;
    comment: string;
  };
  onSuccess?: () => void;
};

export default function ReviewForm({
  productId,
  existingReview,
  onSuccess,
}: ReviewFormProps) {
  const { createReview, updateReview, fetchProducts } = useProductStore();
  const form = useForm<ReviewFormFields>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: existingReview?.rating ?? 0,
      comment: existingReview?.comment ?? "",
    },
  });

  const onSubmit = async (data: ReviewFormFields) => {
    if (existingReview) {
      await updateReview({
        _id: existingReview._id,
        rating: data.rating,
        comment: data.comment,
        productId,
      });
    } else {
      await createReview({
        rating: data.rating,
        comment: data.comment,
        productId,
      });
    }
    form.reset();

    await fetchProducts();
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md">
        <div className="mb-4 space-y-4">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className="transition-transform hover:scale-110"
                        onClick={() => field.onChange(rating)}
                      >
                        <Star
                          className={`h-6 w-6 ${
                            rating <= field.value
                              ? "fill-primary"
                              : "fill-gray-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          {existingReview ? "Update Review" : "Submit Review"}
        </Button>
      </form>
    </Form>
  );
}
