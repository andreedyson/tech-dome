import { Button } from "@/components/ui/button";
import { ChartBarStacked } from "lucide-react";
import React from "react";

function CategoriesPage() {
  return (
    <section>
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
          <Button>Add Category</Button>
        </div>
      </div>
    </section>
  );
}

export default CategoriesPage;
