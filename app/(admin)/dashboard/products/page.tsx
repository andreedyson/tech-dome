import { columns as ProductColumns } from "@/components/products/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { getAllProducts } from "@/lib/data/product";
import { Boxes } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
};

async function ProductsPage() {
  const productsData = await getAllProducts();
  return (
    <section className="space-y-4">
      <div className="space-y-3 rounded-lg border-2 bg-background p-4">
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
            <Link href={"/dashboard/products/create"}>
              <Button className="flex items-center gap-2 bg-main-violet-600 text-sm text-white duration-200 hover:bg-main-violet-400">
                <Boxes size={16} />
                Add Product
              </Button>
            </Link>
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
