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
import { editCategory } from "@/lib/actions/category/actions";
import { ActionResult } from "@/types/auth";
import { categorySchema } from "@/types/validations";
import { Category } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { SubmitButton } from "../SubmitButton";

const initialState: ActionResult = {
  error: "",
};

type EditCategoryProps = {
  categoryData: Category;
};

function Submit() {
  const { pending } = useFormStatus();

  return (
    <SubmitButton
      isSubmitting={pending}
      className="w-full bg-yellow-500 hover:bg-yellow-400"
    >
      {pending ? "Editing..." : "Edit"}
    </SubmitButton>
  );
}

function EditCategoryDialog({ categoryData }: EditCategoryProps) {
  const editCategoryWithId = async (_: ActionResult, formData: FormData) => {
    return await editCategory(categoryData, formData);
  };
  const [state, formAction] = useFormState(editCategoryWithId, initialState);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: categoryData.name,
    },
  });

  useEffect(() => {
    form.reset({
      name: categoryData.name,
    });

    if (state.message) {
      router.push("/dashboard/categories");
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
  }, [state, categoryData.name]);

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
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Modify the category details you want to change.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={formAction} className="space-y-4">
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

export default EditCategoryDialog;
