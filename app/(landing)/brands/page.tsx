import { Badge } from "@/components/ui/badge";
import {
  getBrandsWithProducts,
  getBrandsWithTotalProducts,
} from "@/lib/data/brand";
import { getImageUrl } from "@/lib/supabase";
import { convertRupiah } from "@/lib/utils";
import { Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function BrandsPage() {
  const brands = await getBrandsWithTotalProducts();
  const brandWithProducts = await getBrandsWithProducts();

  return (
    <section className="w-full space-y-12">
      {/* Brands Hero Section */}
      <div className="relative h-[350px] w-full md:h-[400px]">
        <Image
          src={"/assets/macbook-laptop.jpg"}
          width={1000}
          height={500}
          alt="Macbook"
          className="h-full w-full rounded-xl object-cover object-top"
        />
        <div className="absolute inset-0 rounded-xl bg-black opacity-50" />

        {/* Brand Hero Text */}
        <div className="absolute top-0 flex w-full flex-col items-center justify-center px-12 py-20 max-lg:order-last">
          <div className="flex w-fit items-center gap-2 rounded-full border-2 bg-white px-3 py-2 text-sm font-semibold text-black shadow-md">
            <Building size={20} />
            Top Quality Tech Brands
          </div>
          <div className="mt-3 flex w-full flex-col items-center justify-center">
            <h1 className="max-w-[350px] text-center text-2xl font-extrabold leading-none text-white md:text-3xl lg:max-w-[500px] lg:text-4xl">
              Discover Top Tech Brands <br />
              <span className="text-main-violet-400">
                {" "}
                for Innovation & Quality
              </span>
            </h1>
            <p className="mt-2 w-full max-w-[350px] text-center text-sm text-slate-300 lg:max-w-[400px] lg:text-base">
              Explore a curated selection of the most trusted tech brands,
              bringing you cutting-edge innovation, quality, and performance.
              Find the perfect brand for your next upgrade! Let me know if
              you&apos;d like any tweaks! 🚀
            </p>
          </div>
        </div>
      </div>

      {/* Brands Bento Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold leading-none md:text-3xl">
          Top Brands by Product Count
        </h2>
        <div className="grid h-full w-full grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-4">
          {/* Brand 1 */}
          <div className="relative flex flex-col items-center justify-center rounded-lg py-8 md:col-span-2 md:row-span-4">
            <Image
              src={brands[0] ? brands[0].logo : "/assets/image-placeholder.svg"}
              width={800}
              height={600}
              alt={brands[0] ? brands[0].name : "-"}
              className="aspect-video w-[100px] rounded-xl object-contain lg:h-[100px] lg:w-[250px]"
            />
            <div className="absolute inset-0 rounded-lg bg-black opacity-40" />
            <div className="absolute text-center text-white">
              <p className="font-bold uppercase">{brands[0].name}</p>
              <p className="font-semibold text-main-violet-300">
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
            <div className="absolute inset-0 rounded-lg bg-black opacity-40" />
            <div className="absolute text-center text-white">
              <p className="font-bold uppercase">
                {brands[1] ? brands[1].name : "-"}
              </p>
              <p className="font-semibold text-main-violet-300">
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
            <div className="absolute inset-0 rounded-lg bg-black opacity-40" />
            <div className="absolute text-center text-white">
              <p className="font-bold uppercase">
                {brands[2] ? brands[2].name : "-"}
              </p>
              <p className="font-semibold text-main-violet-300">
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
            <div className="absolute inset-0 rounded-lg bg-black opacity-40" />
            <div className="absolute text-center text-white">
              <p className="font-bold uppercase">
                {brands[3] ? brands[3].name : "-"}
              </p>
              <p className="font-semibold text-main-violet-300">
                {brands[3] ? brands[3].totalProducts : 0} Products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products by Brand Section */}
      <div>
        {brandWithProducts.length > 0 ? (
          <div className="space-y-6">
            {brandWithProducts.map((brand) => (
              <div key={brand.id + brand.name} className="space-y-3">
                <h3 className="text-xl font-bold leading-none md:text-2xl">
                  {brand.name}
                </h3>

                <div className="flex w-full md:overflow-x-auto">
                  {brand.products.length > 0 ? (
                    brand.products.map((product) => (
                      <Link
                        key={product.id + product.name}
                        href={`/product-details/${product.id}`}
                        className="flex rounded-lg border-2 duration-200 hover:border-main-violet-800 max-md:w-full md:flex-shrink-0"
                      >
                        <div className="relative">
                          <Image
                            src={getImageUrl(product.images[0], "products")}
                            width={180}
                            height={180}
                            alt={product.name}
                            className="size-full rounded-l-lg object-cover md:size-[180px]"
                          />
                          <Badge className="absolute left-2 top-2 rounded-full text-xs">
                            {product.category.name}
                          </Badge>
                        </div>
                        <div className="p-4 leading-5">
                          <p className="font-bold">{product.name}</p>
                          <p className="text-sm font-semibold text-main-violet-500">
                            {convertRupiah(product.price)}
                          </p>
                          <p className="mt-3 line-clamp-3 max-w-[300px] text-balance text-sm sm:max-w-[400px] md:w-[240px]">
                            {product.description}
                          </p>
                          <p className="mt-4 text-sm text-muted-foreground">
                            Delivered from {product.location.name}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="flex h-full w-full flex-col items-center gap-2 text-center">
                      <Image
                        src={"/assets/empty-vault.svg"}
                        width={500}
                        height={300}
                        alt="Products Not Found"
                        className="aspect-video w-[180px] lg:w-[280px]"
                        priority
                      />
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold md:text-base">
                          No Products from {brand.name} yet.
                        </h4>
                        <p className="max-w-md text-xs md:text-sm">
                          Showing list of product from {brand.name}.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
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
                No Brands data yet.
              </h4>
              <p className="max-w-md text-xs md:text-sm">
                Showing list of product from each Brands.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default BrandsPage;
