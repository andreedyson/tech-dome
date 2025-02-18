"use client";

import { useCart } from "@/hooks/use-cart";
import { orderDetailsSchmea } from "@/types/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Globe,
  MapPin,
  MapPinHouse,
  Notebook,
  UserCircle2Icon,
} from "lucide-react";
import { Textarea } from "../ui/textarea";

function CheckoutForm() {
  const { products } = useCart();
  const form = useForm<z.infer<typeof orderDetailsSchmea>>({
    resolver: zodResolver(orderDetailsSchmea),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      phone: "",
      notes: "",
    },
  });

  const grandTotals = useMemo(() => {
    return products.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0,
    );
  }, [products]);

  return (
    <div className="grid w-full gap-6 md:grid-cols-4">
      {/* Shipping Details */}
      <div className="space-y-4 md:col-span-3">
        <h3 className="text-lg font-bold md:text-xl">Shipping Details</h3>
        <div className="grid rounded-lg border-2 bg-background p-4">
          <Form {...form}>
            <form action="">
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="address">Address</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-center rounded-md border border-input bg-muted">
                          <MapPinHouse className="mx-2" />

                          <Input
                            id="address"
                            placeholder="Enter Your House Address Details"
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
                <div className="grid grid-cols-2 gap-6">
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
            </form>
          </Form>
        </div>
      </div>
      {/* Payment Detail */}
      <div className="space-y-4 md:col-span-1">
        <h3 className="text-lg font-bold md:text-xl">Payment</h3>
        <div className="grid rounded-lg border-2 bg-background p-4">
          Payment Details
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
