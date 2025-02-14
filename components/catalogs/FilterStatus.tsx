import React from "react";
import { Input } from "../ui/input";

function FilterStatus() {
  return (
    <div className="space-y-3">
      {/* Filter Status Header */}
      <h4 className="text-base font-semibold md:text-lg">Status</h4>

      {/* Filter Status Checkboxes */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input type="checkbox" className="size-4" />
          <p className="font-semibold text-orange-500">Pre-Order</p>
        </div>
        <div className="flex items-center gap-2">
          <Input type="checkbox" className="size-4" />
          <p className="font-semibold text-green-500">Ready</p>
        </div>
      </div>
    </div>
  );
}

export default FilterStatus;
