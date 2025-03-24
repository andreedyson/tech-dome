"use client";

import FilterCheckboxItem from "./FilterCheckboxItem";

function FilterStatus() {
  return (
    <div className="space-y-3">
      {/* Filter Status Header */}
      <div className="flex w-full items-center justify-between text-base font-semibold md:text-lg">
        Status
      </div>

      {/* Filter Status Checkboxes */}
      <div className="space-y-2">
        <FilterCheckboxItem id={"PRE_ORDER"} value="PRE_ORDER" type="status" />
        <FilterCheckboxItem id={"READY"} value="READY" type="status" />
      </div>
    </div>
  );
}

export default FilterStatus;
