"use client";

import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { createOrderDetails } from "@/lib/actions/cart/actions";
import { currencyFormatterIDR } from "@/lib/utils";
import { ActionResult } from "@/types/auth";
import { orderDetailsSchmea } from "@/types/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronRight,
  Globe,
  MapPin,
  MapPinHouse,
  MonitorDot,
  Notebook,
  PhoneCall,
  UserCircle2Icon,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SubmitButton } from "../SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

const initialState: ActionResult = {
  error: "",
};

function Submit() {
  const { pending } = useFormStatus();

  return (
    <SubmitButton
      isSubmitting={pending}
      className="mt-5 w-full rounded-full bg-main-violet-700 hover:bg-main-violet-500"
    >
      <div className="flex items-center gap-1">
        {pending ? "Checking Out..." : "Check Out"}
        <ChevronRight size={18} strokeWidth={3} />
      </div>
    </SubmitButton>
  );
}

function CheckoutForm() {
  const { products } = useCart();

  const createrOrderParams = async (_: unknown, formData: FormData) => {
    return await createOrderDetails(_, formData, products, grandTotal);
  };
  const [state, formAction] = useFormState(createrOrderParams, initialState);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof orderDetailsSchmea>>({
    resolver: zodResolver(orderDetailsSchmea),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      phone: "",
      postalCode: "",
      notes: "",
    },
  });

  const grandTotal = useMemo(() => {
    return products.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0,
    );
  }, [products]);

  useEffect(() => {
    if (state.message) {
      toast({
        title: "Success ✔️",
        description: state.message,
        variant: "success",
      });
    }

    if (state.error) {
      toast({
        title: "There's a problem 😵",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state]);

  return (
    <Form {...form}>
      <form action={formAction}>
        <div className="grid w-full gap-6 lg:grid-cols-6">
          {/* Shipping Details */}
          <div className="space-y-4 lg:col-span-4">
            <h3 className="text-lg font-bold md:text-xl">Shipping Details</h3>
            <div className="grid rounded-lg border-2 bg-background p-4">
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-center rounded-md border border-input bg-muted">
                          <UserCircle2Icon className="mx-2" />
                          <Input
                            id="name"
                            placeholder="Enter Your Full Name"
                            autoComplete="off"
                            className="rounded-l-none border-2 bg-input"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="phone">Phone</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-center rounded-md border border-input bg-muted">
                          <PhoneCall className="mx-2" />
                          <Input
                            id="phone"
                            placeholder="Enter Your Phone Number"
                            autoComplete="off"
                            className="rounded-l-none border-2 bg-input"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="address">Address</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-center rounded-md border border-input bg-muted">
                          <MapPinHouse className="mx-2" />
                          <Input
                            id="address"
                            placeholder="Enter Your House Address"
                            autoComplete="off"
                            className="rounded-l-none border-2 bg-input"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="city">City</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-center rounded-md border border-input bg-muted">
                            <Globe className="mx-2" />
                            <Input
                              id="city"
                              placeholder="The City You Lived In"
                              autoComplete="off"
                              className="rounded-l-none border-2 bg-input"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-center rounded-md border border-input bg-muted">
                            <MapPin className="mx-2" />
                            <Input
                              id="postalCode"
                              type="string"
                              placeholder="Your Area Postal Code"
                              autoComplete="off"
                              className="rounded-l-none border-2 bg-input"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="notes">Additional Notes</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-center rounded-md border border-input bg-muted">
                          <Notebook className="mx-2" />
                          <Textarea
                            id="notes"
                            placeholder="Additional Notes For Courier"
                            autoComplete="off"
                            className="rounded-l-none border-2 bg-input"
                            rows={5}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          {/* Summary Detail */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-lg font-bold md:text-xl">Summary</h3>
            <div className="grid rounded-lg border-2 bg-background p-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center rounded-full bg-main-violet-500 p-2.5">
                    <MonitorDot color="white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      Top Quality Products
                    </p>
                    <p className="text-sm leading-tight">
                      High-performance tech products with the best deals
                    </p>
                  </div>
                </div>
                <Separator className="my-4 border-2" />
                {/* Payment Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <p>Sub-Total</p>
                    <p className="font-semibold">
                      {currencyFormatterIDR(grandTotal)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p>Insurance</p>
                    <p className="font-semibold">{currencyFormatterIDR(0)}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p>Shipping</p>
                    <p className="font-semibold">{currencyFormatterIDR(0)}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p>Original Warranty</p>
                    <p className="font-semibold">{currencyFormatterIDR(0)}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p>VAT</p>
                    <p className="font-semibold">{currencyFormatterIDR(0)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-bold md:text-xl">Grand Total</p>
                  <p className="text-xl font-bold text-main-violet-500 md:text-2xl">
                    {currencyFormatterIDR(grandTotal)}
                  </p>
                </div>
                <Submit />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default CheckoutForm;
