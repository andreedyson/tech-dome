"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { ChartBarStacked } from "lucide-react";
import { categorySchema } from "@/types/validations";
import { BASE_URL } from "@/constants";
import { useFormState } from "react-dom";
import { createCategory } from "@/lib/actions/category/actions";
import { ActionResult } from "@/types/auth";

const initialState: ActionResult = {
  error: "",
};

function AddCategoryDialog() {
  const [state, formAction] = useFormState(createCategory, initialState);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

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
  }, [state.error, form]);

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    setSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // userId: userId,
          name: values.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitting(false);
        toast({
          title: "Uh oh! Terjadi kesalahan",
          description: data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success 🎉",
          description: data.message,
          variant: "success",
        });
        form.reset();
        setOpen(false);
        setSubmitting(false);
        router.refresh();
      }
    } catch (error) {
      setSubmitting(false);
      toast({
        title: "Gagal menambahkan kategori",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-main-violet-600 text-sm text-white duration-200 hover:bg-main-violet-400">
          <ChartBarStacked size={16} />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] rounded-lg sm:max-w-[380px]">
        <DialogHeader className="space-y-2">
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Please enter the details of the new category you want to create.
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
                      placeholder="ex: Computer"
                      autoComplete="off"
                      className="bg-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <SubmitButton
                isSubmitting={submitting}
                className="w-[150px] bg-main-violet-700 hover:bg-main-violet-500 dark:text-foreground md:w-full"
              >
                {submitting ? "Creating..." : "Create"}
              </SubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddCategoryDialog;
