"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useBrands } from "@/hooks/use-brand";
import { useCategories } from "@/hooks/use-category";
import { useLocations } from "@/hooks/use-location";
import { createBrand } from "@/lib/actions/brand/actions";
import { ActionResult } from "@/types/auth";
import { productSchema } from "@/types/validations";
import { useFormState, useFormStatus } from "react-dom";
import { SubmitButton } from "../SubmitButton";
import { Textarea } from "../ui/textarea";
import ProductImageUpload from "./ProductImageUpload";
import { Button } from "../ui/button";
import Link from "next/link";

const initialState: ActionResult = {
  error: "",
};

function Submit() {
  const { pending } = useFormStatus();

  return (
    <SubmitButton
      isSubmitting={pending}
      className="w-[150px] bg-main-violet-700 hover:bg-main-violet-500"
    >
      {pending ? "Creating..." : "Create"}
    </SubmitButton>
  );
}

function AddProductForm() {
  const [state, formAction] = useFormState(createBrand, initialState);
  const { toast } = useToast();

  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const { data: locations } = useLocations();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: "Success ✔️",
        description: state.message,
        variant: "success",
      });

      form.reset();
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
    <div>
      <Form {...form}>
        <form action={formAction} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-7">
            <div className="space-y-2 md:col-span-2">
              <ProductImageUpload />
            </div>

            <div className="col-span-5 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="ex: Logitech"
                          autoComplete="off"
                          className="bg-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="price">Price</FormLabel>
                      <FormControl>
                        <Input
                          id="price"
                          placeholder="Rp ---,---"
                          autoComplete="off"
                          className="bg-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        autoComplete="off"
                        className="bg-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="categoryId">Category</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger
                            id="categoryId"
                            className="bg-input"
                            aria-label="Select Category"
                          >
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={`${category.id}`}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brandId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="brandId">Brand</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger
                            id="brandId"
                            className="bg-input"
                            aria-label="Select Brand"
                          >
                            <SelectValue placeholder="Select Brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {brands?.map((brand) => (
                              <SelectItem key={brand.id} value={`${brand.id}`}>
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="locationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="locationId">Location</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger
                            id="locationId"
                            className="bg-input"
                            aria-label="Select Locations"
                          >
                            <SelectValue placeholder="Select Locations" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations?.map((location) => (
                              <SelectItem
                                key={location.id}
                                value={`${location.id}`}
                              >
                                {location.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="status">Status</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger
                          id="status"
                          className="bg-input"
                          aria-label="Select Status"
                        >
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PRE_ORDER">Pre-Order</SelectItem>
                          <SelectItem value="READY">Ready</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-6 flex items-end justify-end gap-2">
                <Link href={"/dashboard/products"}>
                  <Button className="w-[150px] bg-muted-foreground hover:bg-muted-foreground/50">
                    Cancel
                  </Button>
                </Link>
                <Submit />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AddProductForm;
