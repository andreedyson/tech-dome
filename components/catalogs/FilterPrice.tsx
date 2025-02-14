import React from "react";
import { Input } from "../ui/input";
import { DollarSign } from "lucide-react";

function FilterPrice() {
  return (
    <div className="space-y-3">
      {/* Filter Price Header */}
      <h4 className="text-base font-semibold md:text-lg">Price Range</h4>

      {/* Filter Price Inputs */}
      <div className="space-y-2">
        <div className="relative">
          <DollarSign size={14} className="absolute left-2 top-2.5" />
          <Input
            type="number"
            id="minimum"
            name="minimum"
            placeholder="Minimum Price"
            className="pl-8 placeholder:font-semibold"
          />
        </div>
        <div className="relative">
          <DollarSign size={14} className="absolute left-2 top-2.5" />
          <Input
            type="number"
            id="maximum"
            name="maximum"
            placeholder="Maximum Price"
            className="pl-8 placeholder:font-semibold"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterPrice;
