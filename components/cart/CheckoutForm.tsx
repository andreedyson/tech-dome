"use client";

import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { calculateShippingFee, convertRupiah } from "@/lib/utils";
import { orderDetailsSchema } from "@/types/validations";
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
import { useMemo, useState } from "react";
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
import { BASE_URL } from "@/constants";
import { useRouter } from "next/navigation";

function Submit({
  isDisabled,
  isSubmitting,
}: {
  isDisabled: boolean;
  isSubmitting: boolean;
}) {
  return (
    <SubmitButton
      type="submit"
      disabled={isDisabled || isSubmitting}
      isSubmitting={isSubmitting}
      className="mt-5 w-full rounded-full bg-main-violet-700 hover:bg-main-violet-500"
    >
      <div className="flex items-center gap-1">
        {isSubmitting ? "Checking Out..." : "Check Out"}
        <ChevronRight size={18} strokeWidth={3} />
      </div>
    </SubmitButton>
  );
}

function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { products, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const totalPrice = useMemo(
    () => products.reduce((prev, curr) => prev + curr.price * curr.quantity, 0),
    [products],
  );

  const TAX_RATE = 0.1;
  const WARRANTY_RATE = 0.05;
  const SHIPPING_COST =
    products.length > 0 ? calculateShippingFee(totalPrice) : 0;
  const warranty = useMemo(() => totalPrice * WARRANTY_RATE, [totalPrice]);
  const tax = useMemo(
    () => (totalPrice + SHIPPING_COST + warranty) * TAX_RATE,
    [totalPrice],
  );
  const grandTotal = useMemo(
    () => totalPrice + tax + SHIPPING_COST + warranty,
    [totalPrice, tax],
  );

  const form = useForm<z.infer<typeof orderDetailsSchema>>({
    resolver: zodResolver(orderDetailsSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      phone: "",
      postalCode: "",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof orderDetailsSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formDataObject: values,
          products,
          total: grandTotal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Uh oh! Something went wrong 😵",
          description: data?.error || "Failed to place order",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success 🎉",
          description: data.message,
          variant: "success",
        });
        form.reset();
        clearCart();
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          router.refresh();
        }
      }
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full gap-6 lg:grid-cols-6">
          {/* Shipping Details */}
          <div className="space-y-4 lg:col-span-4">
            <h3 className="text-lg font-bold md:text-xl">Shipping Details</h3>
            <div className="grid rounded-lg border-2 bg-background p-4">
              <div className="space-y-3">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <div className="flex items-center rounded-md border bg-muted">
                          <UserCircle2Icon className="mx-2" />
                          <Input
                            {...field}
                            className="rounded-l-none border-2 bg-input"
                            placeholder="Enter Your Full Name"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <div className="flex items-center rounded-md border bg-muted">
                          <PhoneCall className="mx-2" />
                          <Input
                            {...field}
                            className="rounded-l-none border-2 bg-input"
                            placeholder="Enter Your Phone Number"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <div className="flex items-center rounded-md border bg-muted">
                          <MapPinHouse className="mx-2" />
                          <Input
                            {...field}
                            className="rounded-l-none border-2 bg-input"
                            placeholder="Enter Your House Address"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-6 md:grid-cols-2">
                  {/* City */}
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <div className="flex items-center rounded-md border bg-muted">
                            <Globe className="mx-2" />
                            <Input
                              {...field}
                              className="rounded-l-none border-2 bg-input"
                              placeholder="The City You Lived In"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Postal Code */}
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <div className="flex items-center rounded-md border bg-muted">
                            <MapPin className="mx-2" />
                            <Input
                              {...field}
                              className="rounded-l-none border-2 bg-input"
                              placeholder="Your Area Postal Code"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (optional)</FormLabel>
                      <FormControl>
                        <div className="flex items-center rounded-md border bg-muted">
                          <Notebook className="mx-2" />
                          <Textarea
                            {...field}
                            rows={5}
                            className="rounded-l-none border-2 bg-input"
                            placeholder="Additional Notes For Courier"
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
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <p>Sub-Total</p>
                    <p className="font-semibold">{convertRupiah(totalPrice)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p className="font-semibold">
                      {convertRupiah(SHIPPING_COST)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Original Warranty</p>
                    <p className="font-semibold">{convertRupiah(warranty)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>VAT (10%)</p>
                    <p className="font-semibold">{convertRupiah(tax)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-bold md:text-xl">Grand Total</p>
                  <p className="text-xl font-bold text-main-violet-500 md:text-2xl">
                    {convertRupiah(grandTotal)}
                  </p>
                </div>
                <Submit
                  isDisabled={products.length === 0}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default CheckoutForm;
