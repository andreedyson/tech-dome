"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { SubmitButton } from "../SubmitButton";
import { Boxes } from "lucide-react";
import { productSchema } from "@/types/validations";
import { createBrand } from "@/lib/actions/brand/actions";
import { ActionResult } from "@/types/auth";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import ProductImageUpload from "./ProductImageUpload";

const initialState: ActionResult = {
  error: "",
};

function Submit() {
  const { pending } = useFormStatus();

  return (
    <SubmitButton
      isSubmitting={pending}
      className="w-[150px] bg-main-violet-700 hover:bg-main-violet-500 md:w-full"
    >
      {pending ? "Creating..." : "Create"}
    </SubmitButton>
  );
}

function AddProductDialog() {
  const [state, formAction] = useFormState(createBrand, initialState);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

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
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-main-violet-600 text-sm text-white duration-200 hover:bg-main-violet-400">
          <Boxes size={16} />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] rounded-lg sm:max-w-[380px] md:max-w-[500px] lg:max-w-[700px]">
        <DialogHeader className="flex flex-col items-center justify-center space-y-2 text-center">
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Enter the details of the new product you want to add to the store.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={formAction} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-5">
              <div className="space-y-2 md:col-span-2">
                <ProductImageUpload />
              </div>

              <div className="col-span-3 space-y-3">
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
                  name="name"
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

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="categoryId">Category</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger id="categoryId" className="bg-input">
                              <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
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
                            <SelectTrigger id="brandId" className="bg-input">
                              <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
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
                  name="locationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="locationId">Location</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger id="locationId" className="bg-input">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Submit />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProductDialog;
