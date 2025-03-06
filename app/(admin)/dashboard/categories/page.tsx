import AddCategoryDialog from "@/components/categories/AddCategoryDialog";
import { columns as CategoryColumns } from "@/components/categories/columns";
import { DataTable } from "@/components/ui/data-table";
import { getAllCategories } from "@/lib/data/category";
import { ChartBarStacked } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

async function CategoriesPage() {
  const categoriesData = await getAllCategories();

  return (
    <section className="space-y-4">
      <div className="space-y-3 rounded-lg border-2 bg-background p-4">
        {/* Categories Page Header */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full space-y-2">
            <h2 className="flex items-center gap-2 text-2xl font-bold leading-none md:text-3xl">
              <ChartBarStacked className="size-6 md:size-8" />
              Categories
            </h2>
            <p className="text-sm leading-none text-muted-foreground md:text-base">
              Organize and manage your product categories efficiently.
            </p>
          </div>
          <div className="flex w-full justify-end">
            <AddCategoryDialog />
          </div>
        </div>
        {/* Data Table */}
        <div>
          <DataTable columns={CategoryColumns} data={categoriesData} />
        </div>
      </div>
    </section>
  );
}

export default CategoriesPage;
