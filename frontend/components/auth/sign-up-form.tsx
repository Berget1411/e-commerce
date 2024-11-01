"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { signUpSchema } from "@/schema";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { useState } from "react";
import LoadingSpinner from "../ui/loading-spinner";

type SignUpFormFields = z.infer<typeof signUpSchema>;
export default function SignUpForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const form = useForm<SignUpFormFields>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (data: SignUpFormFields) => {
    setError(undefined);
    setSuccess(undefined);
    const validatedData = signUpSchema.safeParse(data);
    if (!validatedData.success) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-up`,
        {
          method: "POST",
          body: JSON.stringify(validatedData.data),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to sign up");
      }

      const user = await response.json();
      setSuccess("Account created successfully");
      console.log(user);
    } catch (error) {
      console.error("Sign up error:", error);
      setError(error.message as string);
    }
  };
  return (
    <CardWrapper
      title="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial={true}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <div className="mb-4 space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
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
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-4 w-full">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <LoadingSpinner />
            ) : (
              "Create account"
            )}
          </Button>
        </Form>
      </form>
    </CardWrapper>
  );
}
