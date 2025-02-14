import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import React from "react";

function CatalogsPage() {
  return (
    <section className="mt-8 w-full space-y-8">
      {/* Product Catalog Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-2xl font-bold md:text-3xl">Our Product Catalog</h2>
        <div className="relative flex items-center">
          <Input
            type="text"
            id="search"
            name="search"
            placeholder="Search product"
            className="bg-input md:w-[400px]"
            autoComplete="off"
          />
          <Label htmlFor="search" className="absolute right-4">
            <Search />
          </Label>
        </div>
      </div>

      {/* Product List Catalog */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-xl border-2 bg-background p-4 shadow md:col-span-1">
          <h3 className="text-xl font-bold md:text-2xl">Filters</h3>
        </div>
        <div className="rounded-xl border-2 bg-background p-4 shadow md:col-span-3">
          <h3 className="text-xl font-bold md:text-2xl">Products</h3>
        </div>
      </div>
    </section>
  );
}

export default CatalogsPage;
