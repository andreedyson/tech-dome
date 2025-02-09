import AddProductForm from "@/components/products/AddProductForm";
import { Boxes, ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

async function CreateProductPage() {
  return (
    <div className="w-full space-y-4">
      <Link
        href={"/dashboard/products"}
        className="flex items-center gap-0.5 duration-200 hover:text-main-violet-500 hover:underline"
      >
        <ChevronLeft />
        <p>Back</p>
      </Link>

      <div className="w-full space-y-2">
        <h2 className="flex items-center gap-2 text-2xl font-bold leading-none md:text-3xl">
          <Boxes className="size-6 md:size-8" />
          Create Products
        </h2>
        <p className="text-sm leading-none text-muted-foreground md:text-base">
          Enter the details of the new product you want to add to the store.
        </p>
      </div>
      <AddProductForm />
    </div>
  );
}

export default CreateProductPage;
