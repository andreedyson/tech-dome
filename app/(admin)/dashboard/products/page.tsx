import React from "react";
import { columns as ProductColumns } from "@/components/products/columns";
import { DataTable } from "@/components/ui/data-table";
import { Boxes } from "lucide-react";
import { getAllProducts } from "@/lib/data/product";
import AddProductDialog from "@/components/products/AddProductDialog";

async function ProductsPage() {
  const productsData = await getAllProducts();
  return (
    <section className="space-y-4">
      <div className="space-y-3 rounded-lg bg-muted p-4">
        {/* Products Page Header */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full space-y-2">
            <h2 className="flex items-center gap-2 text-2xl font-bold leading-none md:text-3xl">
              <Boxes className="size-6 md:size-8" />
              Products
            </h2>
            <p className="text-sm leading-none text-muted-foreground md:text-base">
              Organize and manage your products efficiently.
            </p>
          </div>
          <div className="flex w-full justify-end">
            <AddProductDialog />
          </div>
        </div>
        {/* Data Table */}
        <div>
          <DataTable columns={ProductColumns} data={productsData} />
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;
