"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { SignUp } from "@/lib/actions/auth/customer/actions";
import { RegisterActionResult } from "@/types/auth";
import { registerSchema } from "@/types/validations";
import { zodResolver } from "@hookform/resolvers/zod";
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

const initialState: RegisterActionResult = {
  errors: {
    name: undefined,
    email: undefined,
    password: undefined,
  },
  message: undefined,
};

export function RegisterForm({ className }: React.ComponentProps<"div">) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(SignUp, initialState);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
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
        {pending ? "Creating..." : "Create"}
      </Button>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border shadow-lg">
      <div>
        <Form {...form}>
          <form action={formAction} className="p-6 md:p-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2">
                <a
                  href="#"
                  className="flex items-center gap-2 font-semibold italic"
                >
                  <div className="flex size-8 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">
                    TD
                  </div>
                  Tech Dome
                </a>
              </div>
              <div className="space-y-2 text-center">
                <h1 className="text-lg font-bold md:text-2xl">
                  Create an account! 🔑
                </h1>
                <p className="max-w-[300px] text-sm text-muted-foreground">
                  Sign up to enjoy personalized experiences, track orders, and
                  access exclusive offers.
                </p>
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="name"
                          name="name"
                          placeholder="ex: John Doe"
                          autoComplete="off"
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors("name");
                          }}
                        />
                      </FormControl>
                      <FormMessage>{state.errors.name}</FormMessage>
                    </FormItem>
                  )}
                />
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
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors("email");
                          }}
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
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors("password");
                          }}
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
                Already have an account?{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
