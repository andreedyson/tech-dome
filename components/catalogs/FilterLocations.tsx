import React from "react";
import { Input } from "../ui/input";

function FilterLocations() {
  return (
    <div className="space-y-3">
      {/* Filter Locations Header */}
      <h4 className="text-base font-semibold md:text-lg">Locations</h4>

      {/* Filter Locations Checkboxes */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input type="checkbox" className="size-4" />
          <p className="font-medium">Indonesia</p>
        </div>
      </div>
    </div>
  );
}

export default FilterLocations;
