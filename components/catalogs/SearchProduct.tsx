"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Search } from "lucide-react";
import { useFilterCatalog } from "@/hooks/useFilterCatalog";

function SearchProduct() {
  const { setFilter } = useFilterCatalog();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter({
        search: query,
      });
    }, 1000);

    return () => clearTimeout(debounceInput);
  }, [query]);

  return (
    <div className="relative flex items-center">
      <Input
        type="text"
        id="search"
        name="search"
        placeholder="Search product"
        className="bg-input md:w-[400px]"
        autoComplete="off"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <Label htmlFor="search" className="absolute right-4">
        <Search />
      </Label>
    </div>
  );
}

export default SearchProduct;
