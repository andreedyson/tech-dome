"use client";

import { ActionResult } from "@/types/auth";
import { Category } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { SubmitButton } from "../SubmitButton";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/lib/actions/category/actions";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

const initialState: ActionResult = {
  error: "",
};

type DeleteCategoryProps = {
  categoryData: Category;
};

function Submit() {
  const { pending } = useFormStatus();

  return (
    <SubmitButton
      isSubmitting={pending}
      className="bg-red-500 hover:bg-red-400"
    >
      {pending ? "Deleting..." : "Delete"}
    </SubmitButton>
  );
}

function DeleteCategoryDialog({ categoryData }: DeleteCategoryProps) {
  const editCategoryWithId = async (_: ActionResult, formData: FormData) => {
    return await deleteCategory(categoryData.id, formData);
  };
  const [state, formAction] = useFormState(editCategoryWithId, initialState);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      toast({
        title: "Success ✔️",
        description: state.message,
        variant: "success",
      });

      setOpen(false);
      router.push("/dashboard/categories");
      router.refresh();
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center gap-2 bg-red-500 text-sm text-white duration-200 hover:bg-red-400"
        >
          <Trash size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[350px] rounded-lg sm:max-w-[380px]">
        <form action={formAction}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the category data and remove its data from the
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Submit />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCategoryDialog;
