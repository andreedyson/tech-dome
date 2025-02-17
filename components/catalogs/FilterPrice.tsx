"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { DollarSign } from "lucide-react";
import { useFilterCatalog } from "@/hooks/use-filter-catalog";

function FilterPrice() {
  const { setFilter } = useFilterCatalog();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (maxPrice !== 0 && minPrice > maxPrice) {
      setError("Minimum price should be less than the Maximum Price");
    } else {
      setError("");
    }

    const debounceInput = setTimeout(() => {
      setFilter({
        minPrice: minPrice,
        maxPrice: maxPrice,
      });
    }, 1000);

    return () => clearTimeout(debounceInput);
  }, [minPrice, maxPrice]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value)) {
      setMinPrice(value);
    } else {
      setMinPrice(0);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value)) {
      setMaxPrice(value);
    } else {
      setMaxPrice(0);
    }
  };

  return (
    <div className="space-y-3">
      {/* Filter Price Header */}
      <h4 className="text-base font-semibold md:text-lg">Price Range</h4>

      {/* Filter Price Inputs */}
      <div className="space-y-2">
        <div className="animate-pulse text-balance text-sm text-red-500">
          {error}
        </div>
        <div className="relative">
          <DollarSign size={14} className="absolute left-2 top-2.5" />
          <Input
            type="number"
            id="minimum"
            name="minimum"
            placeholder="Minimum Price"
            className="pl-8 placeholder:font-semibold"
            onChange={handleMinPriceChange}
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
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterPrice;
