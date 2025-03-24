import { getAllCategories } from "@/lib/data/category";
import FilterCheckboxItem from "./FilterCheckboxItem";

async function FilterCategories() {
  const categories = await getAllCategories("name");
  return (
    <div className="space-y-3">
      {/* Filter Categories Header */}
      <h4 className="text-base font-semibold md:text-lg">Categories</h4>

      {/* Filter Categories Checkboxes */}
      <div className="space-y-2">
        {categories.map((category) => (
          <FilterCheckboxItem
            key={category.id + category.name}
            id={category.id.toString()}
            value={category.name}
            type="category"
          />
        ))}
      </div>
    </div>
  );
}

export default FilterCategories;
