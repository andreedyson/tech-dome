import { getNewReleaseProducts } from "@/lib/data/product";
import { getImageUrl } from "@/lib/supabase";
import { convertRupiah, formatDaysAgo } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

async function NewReleases() {
  const newReleases = await getNewReleaseProducts();
  return (
    <section className="w-full space-y-4">
      {/* New Releases Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">New Releases</h2>
        <Button variant={"ghost"} className="border-2 font-semibold">
          Explore All
        </Button>
      </div>

      {/* New Releases Section */}
      <div className="w-full">
        {newReleases.length ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {newReleases.map((product) => (
              <Link
                key={product.id}
                href={`/product-details/${product.id}`}
                className="rounded-xl border-2 shadow-md duration-200 hover:ring-2 hover:ring-main-violet-500"
              >
                {/* Product Image */}
                <Image
                  src={getImageUrl(product.images[0], "products")}
                  width={150}
                  height={150}
                  alt={product.name}
                  className="w-full rounded-t-xl object-contain"
                />
                {/* Product Details */}
                <div className="p-4">
                  <h4 className="line-clamp-1 text-lg font-bold md:text-xl">
                    {product.name}
                  </h4>
                  <p className="text-sm font-medium text-muted-foreground">
                    {product.category.name}
                  </p>
                  <p className="mt-2 text-base font-bold text-main-violet-700 md:mt-3 md:text-lg">
                    {convertRupiah(product.price)}
                  </p>

                  <p className="mt-4 text-sm font-semibold text-muted-foreground">
                    Added {formatDaysAgo(product.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center gap-2 text-center">
            <Image
              src={"/assets/empty-products.svg"}
              width={500}
              height={300}
              alt="Products Not Found"
              className="aspect-video size-[180px] lg:size-[280px]"
              priority
            />
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold md:text-base">
                No New Releases Products Found
              </h4>
              <p className="max-w-md text-xs md:text-sm">
                Showing the top selling Products on DealDome.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewReleases;
