import HorizontalProductCard from "@/components/card/HorizontalProductCard";
import BrandsBanner from "@/components/pages/BrandsBanner";
import { Button } from "@/components/ui/button";
import {
  getBrandsWithProducts,
  getBrandsWithTotalProducts,
} from "@/lib/data/brand";
import Image from "next/image";
import Link from "next/link";

async function BrandsPage() {
  const brands = await getBrandsWithTotalProducts();
  const brandWithProducts = await getBrandsWithProducts();

  return (
    <section className="w-full space-y-12">
      <BrandsBanner />

      {/* Brands Bento Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold leading-none max-sm:text-center md:text-3xl">
          Top Brands by Product Count
        </h2>
        <div className="grid h-full w-full grid-cols-2 gap-4 text-sm md:grid-cols-4 md:grid-rows-4 md:text-base">
          {/* Brand 1 */}
          <div className="relative flex flex-col items-center justify-center rounded-lg py-8 md:col-span-2 md:row-span-4">
            <Image
              src={brands[0] ? brands[0].logo : "/assets/image-placeholder.svg"}
              width={800}
              height={600}
              alt={brands[0] ? brands[0].name : "-"}
              className="aspect-video w-[100px] rounded-xl object-contain lg:h-[100px] lg:w-[250px]"
            />
            <div className="absolute inset-0 rounded-lg bg-black opacity-70" />
            <div className="absolute text-center text-white">
              <p className="font-bold uppercase">{brands[0].name}</p>
              <p className="font-semibold text-main-violet-400">
                {brands[0] ? brands[0].totalProducts : 0} Products
              </p>
            </div>
          </div>
          {/* Brand 2 */}
          <div className="relative flex flex-col items-center justify-center rounded-lg py-8 md:col-span-2 md:col-start-3 md:row-span-2">
            <Image
              src={brands[1] ? brands[1].logo : "/assets/image-placeholder.svg"}
              width={800}
              height={600}
              alt={brands[1] ? brands[1].name : "-"}
              className="aspect-video w-[100px] rounded-xl object-contain lg:h-[100px] lg:w-[250px]"
            />
            <div className="absolute inset-0 rounded-lg bg-black opacity-70" />
            <div className="absolute text-center text-white">
              <p className="font-bold uppercase">
                {brands[1] ? brands[1].name : "-"}
              </p>
              <p className="font-semibold text-main-violet-400">
                {brands[1] ? brands[1].totalProducts : 0} Products
              </p>
            </div>
          </div>
          {/* Brand 3 */}
          <div className="relative flex flex-col items-center justify-center rounded-lg py-8 md:col-start-3 md:row-span-2 md:row-start-3">
            <Image
              src={brands[2] ? brands[2].logo : "/assets/image-placeholder.svg"}
              width={800}
              height={600}
              alt={brands[2] ? brands[2].name : "-"}
              className="aspect-video w-[100px] rounded-xl object-contain lg:h-[100px] lg:w-[200px]"
            />
            <div className="absolute inset-0 rounded-lg bg-black opacity-70" />
            <div className="absolute text-center text-white">
              <p className="font-bold uppercase">
                {brands[2] ? brands[2].name : "-"}
              </p>
              <p className="font-semibold text-main-violet-400">
                {brands[2] ? brands[2].totalProducts : 0} Products
              </p>
            </div>
          </div>
          {/* Brand 4 */}
          <div className="relative flex flex-col items-center justify-center rounded-lg py-8 md:col-start-4 md:row-span-2 md:row-start-3">
            <Image
              src={brands[3] ? brands[3].logo : "/assets/image-placeholder.svg"}
              width={800}
              height={600}
              alt={brands[3] ? brands[3].name : "-"}
              className="aspect-video w-[100px] rounded-xl object-contain lg:h-[100px] lg:w-[200px]"
            />
            <div className="absolute inset-0 rounded-lg bg-black opacity-70" />
            <div className="absolute text-center text-white">
              <p className="font-bold uppercase">
                {brands[3] ? brands[3].name : "-"}
              </p>
              <p className="font-semibold text-main-violet-400">
                {brands[3] ? brands[3].totalProducts : 0} Products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products by Brand Section */}
      <div>
        {brandWithProducts.filter((brand) => brand.products.length > 0).length >
        0 ? (
          <div className="space-y-6">
            {brandWithProducts
              .filter((brand) => brand.products.length > 0)
              .slice(0, 6)
              .map((brand) => (
                <div key={brand.id + brand.name} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="aspect-video h-8 w-16 object-contain">
                      <Image
                        src={brand.logo}
                        width={80}
                        height={40}
                        alt={brand.name}
                        className="size-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold leading-none md:text-2xl">
                      {brand.name}
                    </h3>
                  </div>

                  <div className="custom-scrollbar grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
                    {brand.products.slice(0, 4).map((product) => (
                      <HorizontalProductCard
                        key={product.id + product.name}
                        product={product}
                      />
                    ))}
                  </div>
                </div>
              ))}
            <div className="flex items-center justify-center">
              <Link href={"/catalogs"}>
                <Button variant={"link"}>Explore More in Catalogs</Button>
              </Link>
            </div>
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
                No Brands with Products Available.
              </h4>
              <p className="max-w-md text-xs md:text-sm">
                Currently, no brands have available products.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default BrandsPage;
