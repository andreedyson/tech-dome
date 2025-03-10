"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useToast } from "@/hooks/use-toast";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { LoginActionResult } from "@/types/auth";
import { useEffect, useState } from "react";
import { z } from "zod";
import { loginSchema } from "@/types/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../ui/checkbox";
import { SignIn } from "@/lib/actions/auth/customer/actions";
import { Badge } from "../ui/badge";

const initialState: LoginActionResult = {
  errors: {
    email: undefined,
    password: undefined,
  },
  message: undefined,
};

export function CustomerLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="overflow-hidden rounded-lg border shadow-lg">
        <div className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form action={formAction} className="p-6 md:p-8">
              <div className="flex flex-col gap-4">
                <div className="flex justify-center gap-2 md:justify-start">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold italic"
                  >
                    <div className="flex size-8 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">
                      TD
                    </div>
                    Tech Dome
                  </Link>
                </div>
                <div className="mt-4 space-y-2">
                  <h1 className="text-xl font-bold md:text-2xl">
                    Welcome Back! 👋
                  </h1>
                  <p className="max-w-[300px] text-sm text-muted-foreground">
                    Enter your email and password below to login to your
                    account.
                  </p>
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
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
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder={
                              showPassword ? "Your Password" : "********"
                            }
                          />
                        </FormControl>
                        <FormMessage>{state?.errors.password}</FormMessage>
                        <div className="flex items-center justify-end gap-2 text-sm">
                          <Checkbox
                            id="showPassword"
                            onCheckedChange={() =>
                              setShowPassword((prev) => !prev)
                            }
                          />
                          <Label htmlFor="showPassword">Show Password</Label>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="mt-2">
                    <SubmitButton />
                  </div>
                </div>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="underline underline-offset-4"
                  >
                    Register
                  </Link>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Link
                  href={"/admin/sign-in"}
                  className="flex items-center gap-2 text-sm font-semibold text-main-violet-500 duration-200 hover:text-main-violet-700 hover:underline"
                >
                  <User size={16} strokeWidth={3} />
                  Admin Sign In
                </Link>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <Image
              width={1000}
              height={2000}
              src="/assets/customer-login-form.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
            <div className="absolute inset-0 bg-black opacity-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
