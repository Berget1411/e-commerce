"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { newPasswordSchema } from "@/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
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
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";

type NewPasswordFormFields = z.infer<typeof newPasswordSchema>;

export default function NewPasswordForm() {
  const resetPassword = useUserStore((state) => state.resetPassword);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const form = useForm<NewPasswordFormFields>({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: NewPasswordFormFields) => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Reset token is missing",
      });
      return;
    }

    const success = await resetPassword(data, token);
    if (success) {
      router.push("/auth/login");
    }
  };

  return (
    <CardWrapper
      title="Reset your password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <div className="mb-4 space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
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
              "Reset password"
            )}
          </Button>
        </Form>
      </form>
    </CardWrapper>
  );
}
