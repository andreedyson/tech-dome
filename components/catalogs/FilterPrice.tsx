"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { DollarSign } from "lucide-react";
import { useFilterCatalog } from "@/hooks/useFilterCatalog";

function FilterPrice() {
  const { setFilter } = useFilterCatalog();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter({
        minPrice: minPrice,
      });
    }, 1000);

    return () => clearTimeout(debounceInput);
  }, [minPrice]);

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter({
        maxPrice: maxPrice,
      });
    }, 1000);

    return () => clearTimeout(debounceInput);
  }, [maxPrice]);

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
            onChange={(e) => setMinPrice(Number.parseInt(e.target.value))}
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
            onChange={(e) => setMaxPrice(Number.parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterPrice;
