import React from "react";
import { Input } from "../ui/input";

function FilterBrands() {
  return (
    <div className="space-y-3">
      {/* Filter Brands Header */}
      <h4 className="text-base font-semibold md:text-lg">Brands</h4>

      {/* Filter Brands Checkboxes */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input type="checkbox" className="size-4" />
          <p className="font-medium">Logitech</p>
        </div>
      </div>
    </div>
  );
}

export default FilterBrands;
