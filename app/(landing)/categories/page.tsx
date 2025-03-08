import ProductCard from "@/components/card/ProductCard";
import CategoriesBanner from "@/components/pages/CategoriesBanner";
import {
  getCategoryWithProducts,
  getTotalProductsByCategory,
} from "@/lib/data/category";
import Image from "next/image";

async function CategoriesPage() {
  const categoriesProducts = await getTotalProductsByCategory();
  const categoryWithProducts = await getCategoryWithProducts();

  return (
    <section>
      <CategoriesBanner />

      {/* Categories Header Section */}
      <h1 className="mt-6 max-w-[350px] text-2xl font-extrabold leading-none md:text-3xl lg:max-w-[500px] lg:text-4xl">
        Shop by
        <span className="text-main-violet-500"> Category</span>
      </h1>

      {/* Categories Section */}
      <div className="mt-4 w-full">
        {categoriesProducts.length ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categoriesProducts.map((category) => (
              <div
                key={category.name}
                className="rounded-xl border-2 p-4 shadow-md duration-200 hover:border-yellow-500"
              >
                <p className="text-lg font-bold">{category.name}</p>
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
                Showing product categories that are available on DealDome.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Products by Categories */}
      <div className="mt-12 w-full space-y-12">
        {categoryWithProducts.filter((category) => category.products.length > 0)
          .length > 0 ? (
          categoryWithProducts
            .filter((category) => category.products.length > 0)
            .map((category) => (
              <div
                className="grid gap-4 lg:grid-cols-5"
                key={category.id + category.name}
              >
                <div className="col-span-1">
                  <h3 className="text-lg font-bold md:text-xl">
                    {category.name}
                  </h3>
                  <p>{category.products.length} Products</p>
                </div>
                {/* Products Cards */}
                <div className="col-span-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {category.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))
        ) : (
          <div className="col-span-full flex flex-col items-center gap-2 text-center">
            <Image
              src={"/assets/empty-products.svg"}
              width={500}
              height={300}
              alt="Categories Not Found"
              className="aspect-video size-[180px] lg:size-[280px]"
              priority
            />
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold md:text-base">
                No Categories found.
              </h4>
              <p className="max-w-[350px] text-xs md:text-sm">
                Showing list of categories with products that are available on
                DealDome.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CategoriesPage;
