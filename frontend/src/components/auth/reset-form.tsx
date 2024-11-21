"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordSchema } from "@/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/stores/useUserStore";

type ResetFormFields = z.infer<typeof resetPasswordSchema>;

export default function ResetForm() {
  const forgotPassword = useUserStore((state) => state.forgotPassword);

  const form = useForm<ResetFormFields>({
    defaultValues: { email: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetFormFields) => {
    await forgotPassword(data);
  };

  return (
    <CardWrapper
      title="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <div className="mb-4 space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <LoadingSpinner />
            ) : (
              "Send reset email"
            )}
          </Button>
        </Form>
      </form>
    </CardWrapper>
  );
}
