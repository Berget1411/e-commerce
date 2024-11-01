"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schema";
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

type LoginFormFields = z.infer<typeof loginSchema>;
export default function LoginForm() {
  const form = useForm<LoginFormFields>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginFormFields) => {
    console.log(data);
  };
  return (
    <CardWrapper
      title="Login"
      backButtonLabel="Back to sign up"
      backButtonHref="/auth/sign-up"
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </Form>
      </form>
    </CardWrapper>
  );
}
