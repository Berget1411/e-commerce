"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/validation/auth";
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
import { useUserStore } from "@/stores/useUserStore";
import Link from "next/link";
type LoginFormFields = z.infer<typeof loginSchema>;
export default function LoginForm() {
  const form = useForm<LoginFormFields>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const { login } = useUserStore();

  const onSubmit = async (data: LoginFormFields) => {
    await login(data);
  };
  return (
    <CardWrapper
      title="Login"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/signup"
      showSocial={true}
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
          </div>
          <Button variant="link" className="mb-4 p-0">
            <Link href="/auth/reset">Forgot password?</Link>
          </Button>
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <LoadingSpinner /> : "Login"}
          </Button>
        </Form>
      </form>
    </CardWrapper>
  );
}
