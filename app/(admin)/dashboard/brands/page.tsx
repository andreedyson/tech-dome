// import AddBrandDialog from "@/components/brands/AddBrandDialog";
import AddBrandDialog from "@/components/brands/AddBrandDialog";
import { columns as BrandColumns } from "@/components/brands/columns";
import { DataTable } from "@/components/ui/data-table";
import { validateProtected } from "@/lib/check-session";
import { getAllBrands } from "@/lib/data/brand";
import { Building } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Brands",
};

async function BrandsPage() {
  const brandsData = await getAllBrands();
  const { session } = await validateProtected();

  return (
    <section className="space-y-4">
      <div className="space-y-3 rounded-lg bg-muted p-4">
        {/* Brands Page Header */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full space-y-2">
            <h2 className="flex items-center gap-2 text-2xl font-bold leading-none md:text-3xl">
              <Building className="size-6 md:size-8" />
              Brands
            </h2>
            <p className="text-sm leading-none text-muted-foreground md:text-base">
              Organize and manage your product brands efficiently.
            </p>
          </div>
          <div className="flex w-full justify-end">
            <AddBrandDialog userId={session.userId as string} />
          </div>
        </div>
        {/* Data Table */}
        <div>
          <DataTable columns={BrandColumns} data={brandsData} />
        </div>
      </div>
    </section>
  );
}

export default BrandsPage;
