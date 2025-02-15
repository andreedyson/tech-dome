import React from "react";
import { Input } from "../ui/input";
import { getAllLocations } from "@/lib/data/locations";
import FilterCheckboxItem from "./FilterCheckboxItem";

async function FilterLocations() {
  const locations = await getAllLocations();
  return (
    <div className="space-y-3">
      {/* Filter Locations Header */}
      <h4 className="text-base font-semibold md:text-lg">Locations</h4>

      {/* Filter Locations Checkboxes */}
      <div className="space-y-2">
        {locations.map((location) => (
          <FilterCheckboxItem
            key={location.id + location.name}
            id={location.id.toString()}
            value={location.name}
            type="location"
          />
        ))}
      </div>
    </div>
  );
}

export default FilterLocations;
