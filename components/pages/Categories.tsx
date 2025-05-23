import { getTotalProductsByCategory } from "@/lib/data/category";
import Image from "next/image";
import { Button } from "../ui/button";

async function Categories() {
  const categoriesProducts = await getTotalProductsByCategory();
  return (
    <section className="w-full space-y-4">
      {/* Categories Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">Categories</h2>
        <Button variant={"ghost"} className="border-2 font-semibold">
          Explore All
        </Button>
      </div>

      {/* Categories Products Section */}
      <div className="w-full">
        {categoriesProducts.length ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {categoriesProducts.slice(0, 8).map((category) => (
              <div
                key={category.name}
                className="rounded-xl border-2 p-4 shadow-md duration-200 hover:border-yellow-500"
              >
                <p
                  className="line-clamp-1 text-base font-bold md:text-lg"
                  title={category.name}
                >
                  {category.name}
                </p>
                <p className="text-muted-foreground">
                  {category.totalProducts} Products
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center gap-2 text-center">
            <Image
              src={"/assets/empty-file.svg"}
              width={500}
              height={300}
              alt="Products Not Found"
              className="aspect-video size-[180px] lg:size-[280px]"
              priority
            />
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold md:text-base">
                No Categories Found
              </h4>
              <p className="max-w-md text-xs md:text-sm">
                Showing product categories that are available on TechDome.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Categories;
