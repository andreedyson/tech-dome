import FilterBrands from "@/components/catalogs/FilterBrands";
import FilterCategories from "@/components/catalogs/FilterCategories";
import FilterLocations from "@/components/catalogs/FilterLocations";
import FilterPrice from "@/components/catalogs/FilterPrice";
import FilterStatus from "@/components/catalogs/FilterStatus";
import ProductList from "@/components/catalogs/ProductList";
import SearchProduct from "@/components/catalogs/SearchProduct";
import { Separator } from "@/components/ui/separator";

async function CatalogsPage() {
  return (
    <section className="mt-8 w-full space-y-8">
      {/* Product Catalog Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-2xl font-bold md:text-3xl">Our Product Catalog</h2>
        <SearchProduct />
      </div>

      {/* Product List Catalog */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Products Filter */}
        <div className="hidden h-fit rounded-xl border-2 bg-background p-4 shadow lg:col-span-1 lg:block">
          <h3 className="text-xl font-bold lg:text-2xl">Filters</h3>
          <Separator className="my-4" />
          <FilterPrice />
          <Separator className="my-4" />
          <FilterStatus />
          <Separator className="my-4" />
          <FilterCategories />
          <Separator className="my-4" />
          <FilterBrands />
          <Separator className="my-4" />
          <FilterLocations />
        </div>

        <div className="rounded-xl border-2 bg-background p-4 shadow lg:col-span-3">
          <h3 className="text-xl font-bold md:text-2xl">Products</h3>
          <Separator className="my-2" />
          <ProductList />
        </div>
      </div>
    </section>
  );
}

export default CatalogsPage;
