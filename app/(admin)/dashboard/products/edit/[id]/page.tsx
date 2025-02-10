import EditProductForm from "@/components/products/EditProductForm";
import { getProductById } from "@/lib/data/product";
import { Boxes, ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

async function EditProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await getProductById(id);
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
          Edit Products
        </h2>
        <p className="text-sm leading-none text-muted-foreground md:text-base">
          Modify the details of the {product.name} product .
        </p>
      </div>
      <EditProductForm productData={product} />
    </div>
  );
}

export default EditProductPage;
