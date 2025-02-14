import React from "react";
import { Input } from "../ui/input";
import { getAllBrands } from "@/lib/data/brand";

async function FilterBrands() {
  const brands = await getAllBrands();
  return (
    <div className="space-y-3">
      {/* Filter Brands Header */}
      <h4 className="text-base font-semibold md:text-lg">Brands</h4>

      {/* Filter Brands Checkboxes */}
      <div className="space-y-2">
        {brands.map((brand) => (
          <div key={brand.name + brand.id} className="flex items-center gap-2">
            <Input value={brand.id} type="checkbox" className="size-4" />
            <p className="font-medium">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterBrands;
