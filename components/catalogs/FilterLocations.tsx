import React from "react";
import { Input } from "../ui/input";
import { getAllLocations } from "@/lib/data/locations";

async function FilterLocations() {
  const locations = await getAllLocations();
  return (
    <div className="space-y-3">
      {/* Filter Locations Header */}
      <h4 className="text-base font-semibold md:text-lg">Locations</h4>

      {/* Filter Locations Checkboxes */}
      <div className="space-y-2">
        {locations.map((location) => (
          <div
            key={location.name + location.id}
            className="flex items-center gap-2"
          >
            <Input value={location.id} type="checkbox" className="size-4" />
            <p className="font-medium">{location.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterLocations;
