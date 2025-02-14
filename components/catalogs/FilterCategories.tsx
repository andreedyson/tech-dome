import React from "react";
import { Input } from "../ui/input";

function FilterCategories() {
  return (
    <div className="space-y-3">
      {/* Filter Categories Header */}
      <h4 className="text-base font-semibold md:text-lg">Categories</h4>

      {/* Filter Categories Checkboxes */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input type="checkbox" className="size-4" />
          <p className="font-medium">Audio</p>
        </div>
      </div>
    </div>
  );
}

export default FilterCategories;
