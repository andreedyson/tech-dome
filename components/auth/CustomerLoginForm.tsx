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
                    href="/sign-in"
                    className="flex items-center gap-2 font-semibold italic"
                  >
                    <div className="flex size-8 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">
                      DD
                    </div>
                    Deal Dome
                  </Link>
                </div>
                <div className="space-y-2">
                  <h1 className="text-base font-bold md:text-2xl">
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

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid">
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login with Google</span>
                  </Button>
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
              <div className="mt-8 flex justify-end">
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
