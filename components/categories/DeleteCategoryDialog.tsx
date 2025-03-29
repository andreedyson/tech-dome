"use client";

import { useToast } from "@/hooks/use-toast";
import { deleteCategory } from "@/lib/actions/category/actions";
import { ActionResult } from "@/types/auth";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { SubmitButton } from "../SubmitButton";

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
import { Trash } from "lucide-react";
import { Button } from "../ui/button";

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
  const [state, formAction] = useFormState(
    async () => await deleteCategory(categoryData.id),
    initialState,
  );
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
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
