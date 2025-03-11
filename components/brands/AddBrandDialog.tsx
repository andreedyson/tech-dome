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
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../SubmitButton";
import { Building } from "lucide-react";
import { brandSchema } from "@/types/validations";
import { createBrand } from "@/lib/actions/brand/actions";
import { ActionResult } from "@/types/auth";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";

const initialState: ActionResult = {
  error: "",
};

function Submit() {
  const { pending } = useFormStatus();

  return (
    <SubmitButton
      isSubmitting={pending}
      className="w-full bg-main-violet-700 hover:bg-main-violet-500"
    >
      {pending ? "Creating..." : "Create"}
    </SubmitButton>
  );
}

function AddBrandDialog() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [state, formAction] = useFormState(createBrand, initialState);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      logo: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedImage(previewUrl);
    } else {
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    if (state.message) {
      toast({
        title: "Success ✔️",
        description: state.message,
        variant: "success",
      });

      form.reset();
      setOpen(false);
      setSelectedImage(null);
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
          <Building size={16} />
          Add Brand
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] rounded-lg sm:max-w-[380px]">
        <DialogHeader className="space-y-2">
          <DialogTitle>Create Brand</DialogTitle>
          <DialogDescription>
            Please enter the details of the new brand you want to add.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={formAction} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <Input
                      id="logo"
                      name="logo"
                      onChange={handleFileChange}
                      type="file"
                      autoComplete="off"
                      className="w-full bg-input"
                      accept=".jpg, .png, .jpeg"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Preview */}
            {selectedImage ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <Image
                  src={selectedImage}
                  width={200}
                  height={200}
                  alt="Brand Logo"
                  className="max-h-[200px] object-contain"
                />
                <p
                  onClick={() => setSelectedImage(null)}
                  className="w-fit cursor-pointer border bg-muted px-2 py-1 text-end text-sm"
                >
                  Clear
                </p>
              </div>
            ) : (
              <p className="text-center text-sm">No image selected.</p>
            )}

            <DialogFooter>
              <Submit />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBrandDialog;
