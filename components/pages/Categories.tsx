import React from "react";
import { Button } from "../ui/button";
import { getTotalProductsByCategory } from "@/lib/data/category";

async function Categories() {
  const categoriesProducts = await getTotalProductsByCategory();
  return (
    <section className="w-full space-y-4">
      {/* Categories Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Categories</h2>
        <Button variant={"ghost"} className="border-2 font-semibold">
          Explore All
        </Button>
      </div>

      {/* Categories Products Section */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categoriesProducts.map((category) => (
          <div
            key={category.name}
            className="rounded-xl border-2 p-4 shadow-md"
          >
            <p className="text-lg font-bold">{category.name}</p>
            <p className="text-muted-foreground">
              {category.totalProducts} Products
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
