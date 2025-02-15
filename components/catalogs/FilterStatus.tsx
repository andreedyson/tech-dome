import React from "react";
import { Input } from "../ui/input";
import FilterCheckboxItem from "./FilterCheckboxItem";

function FilterStatus() {
  return (
    <div className="space-y-3">
      {/* Filter Status Header */}
      <h4 className="text-base font-semibold md:text-lg">Status</h4>

      {/* Filter Status Checkboxes */}
      <div className="space-y-2">
        <FilterCheckboxItem id={"READY"} value="PRE-ORDER" type="status" />
        <FilterCheckboxItem id={"PRE_ORDER"} value="READY" type="status" />
      </div>
    </div>
  );
}

export default FilterStatus;
