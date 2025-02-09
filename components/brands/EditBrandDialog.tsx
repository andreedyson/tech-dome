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
import { Building, Pencil } from "lucide-react";
import { brandSchema } from "@/types/validations";
import { createBrand, editBrand } from "@/lib/actions/brand/actions";
import { ActionResult } from "@/types/auth";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { Brand } from "@prisma/client";
import { getImageUrl } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const initialState: ActionResult = {
  error: "",
};

type EditBrandProps = {
  brandData: Brand;
};

function Submit() {
  const { pending } = useFormStatus();

  return (
    <SubmitButton
      isSubmitting={pending}
      className="w-[150px] bg-main-violet-700 hover:bg-main-violet-500 md:w-full"
    >
      {pending ? "Editing..." : "Edit"}
    </SubmitButton>
  );
}

function EditBrandDialog({ brandData }: EditBrandProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>();
  const editBrandWithId = async (_: ActionResult, formData: FormData) => {
    return await editBrand(brandData, formData);
  };
  const [state, formAction] = useFormState(editBrandWithId, initialState);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: brandData.name,
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
    setSelectedImage(getImageUrl(brandData.logo, "brands"));
    form.reset({
      name: brandData.name,
    });

    if (state.message) {
      router.push("/dashboard/brands");
      router.refresh();

      toast({
        title: "Success ✔️",
        description: state.message,
        variant: "success",
      });

      setOpen(false);
    }

    if (state.error) {
      toast({
        title: "There's a problem 😵",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, brandData.name]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center gap-2 bg-yellow-500 text-sm text-white duration-200 hover:bg-yellow-400"
        >
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] rounded-lg sm:max-w-[380px]">
        <DialogHeader className="space-y-2">
          <DialogTitle>Edit Brand</DialogTitle>
          <DialogDescription>
            Modify the details of the brand you want to edit.
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

export default EditBrandDialog;
