import AddProductForm from "@/components/products/AddProductForm";
import { Boxes } from "lucide-react";
import React from "react";

async function CreateProductPage() {
  return (
    <div className="space-y-4">
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
