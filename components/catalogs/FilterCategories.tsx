import React from "react";
import { Input } from "../ui/input";
import { getAllCategories } from "@/lib/data/category";

async function FilterCategories() {
  const categories = await getAllCategories();
  return (
    <div className="space-y-3">
      {/* Filter Categories Header */}
      <h4 className="text-base font-semibold md:text-lg">Categories</h4>

      {/* Filter Categories Checkboxes */}
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.name + category.id}
            className="flex items-center gap-2"
          >
            <Input value={category.id} type="checkbox" className="size-4" />
            <p className="font-medium">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCategories;
