"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { SignIn } from "@/lib/actions/auth/admin/actions";
import { cn } from "@/lib/utils";
import { LoginActionResult } from "@/types/auth";
import { loginSchema } from "@/types/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const initialState: LoginActionResult = {
  errors: {
    email: undefined,
    password: undefined,
  },
  message: undefined,
};

export function AdminLoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(SignIn, initialState);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state.message !== undefined) {
      toast({
        title: "🔑Authentication Error",
        description: state.message,
        variant: "destructive",
      });
    }

    if (Array.isArray(state?.errors)) {
      // Check if state.errors is an array before iterating
      state.errors.forEach((error) => {
        form.setError(error.field, { message: error.message });
      });
    }
  }, [state?.errors, form]);

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Logging In..." : "Login"}
      </Button>
    );
  }

  return (
    <Form {...form}>
      <form
        action={formAction}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-base font-bold md:text-2xl">Admin Login</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email and password below to securely access the admin
            dashboard.
          </p>
        </div>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ex: user@mail.com"
                  />
                </FormControl>
                <FormMessage>{state?.errors.email}</FormMessage>
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
                  <Input
                    {...field}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={showPassword ? "Your Password" : "********"}
                  />
                </FormControl>
                <FormMessage>{state?.errors.password}</FormMessage>
                <div className="flex items-center justify-end gap-2 text-sm">
                  <Checkbox
                    id="showPassword"
                    onCheckedChange={() => setShowPassword((prev) => !prev)}
                  />
                  <Label htmlFor="showPassword">Show Password</Label>
                </div>
              </FormItem>
            )}
          />

          <SubmitButton />
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Register
          </Link>
        </div>
      </form>
      <div className="mt-8 flex justify-center">
        <Link
          href={"/sign-in"}
          className="flex items-center gap-2 text-sm font-semibold text-main-violet-500 duration-200 hover:text-main-violet-700 hover:underline"
        >
          <Users size={16} strokeWidth={3} />
          Customer Sign In
        </Link>
      </div>
    </Form>
  );
}
