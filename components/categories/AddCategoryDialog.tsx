"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import { createCategory } from "@/lib/actions/category/actions";
import { ActionResult } from "@/types/auth";
import { categorySchema } from "@/types/validations";
import { ChartBarStacked } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { SubmitButton } from "../SubmitButton";

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

function AddCategoryDialog() {
  const [state, formAction] = useFormState(createCategory, initialState);
  const [open, setOpen] = useState<boolean>(false);
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
              <Submit />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddCategoryDialog;
