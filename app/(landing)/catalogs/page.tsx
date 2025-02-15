import ProductCard from "@/components/card/ProductCard";
import FilterBrands from "@/components/catalogs/FilterBrands";
import FilterCategories from "@/components/catalogs/FilterCategories";
import FilterLocations from "@/components/catalogs/FilterLocations";
import FilterPrice from "@/components/catalogs/FilterPrice";
import FilterStatus from "@/components/catalogs/FilterStatus";
import SearchProduct from "@/components/catalogs/SearchProduct";
import { Separator } from "@/components/ui/separator";

function CatalogsPage() {
  return (
    <section className="mt-8 w-full space-y-8">
      {/* Product Catalog Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-2xl font-bold md:text-3xl">Our Product Catalog</h2>
        <SearchProduct />
      </div>

      {/* Product List Catalog */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-xl border-2 bg-background p-4 shadow md:col-span-1">
          <h3 className="text-xl font-bold md:text-2xl">Filters</h3>
          <Separator className="my-2" />
          <FilterPrice />
          <Separator className="my-4" />
          <FilterStatus />
          <Separator className="my-4" />
          <FilterBrands />
          <Separator className="my-4" />
          <FilterLocations />
          <Separator className="my-4" />
          <FilterCategories />
        </div>

        <div className="rounded-xl border-2 bg-background p-4 shadow md:col-span-3">
          <h3 className="text-xl font-bold md:text-2xl">Products</h3>
          <Separator className="my-2" />
          <div className="grid grid-cols-3">
            <ProductCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CatalogsPage;
