import { getAllBrands } from "@/lib/data/brand";
import FilterCheckboxItem from "./FilterCheckboxItem";

async function FilterBrands() {
  const brands = await getAllBrands("name");
  return (
    <div className="space-y-3">
      {/* Filter Brands Header */}
      <h4 className="text-base font-semibold md:text-lg">Brands</h4>

      {/* Filter Brands Checkboxes */}
      <div className="space-y-2">
        {brands.map((brand) => (
          <FilterCheckboxItem
            key={brand.id + brand.name}
            id={brand.id.toString()}
            value={brand.name}
            type="brand"
          />
        ))}
      </div>
    </div>
  );
}

export default FilterBrands;
