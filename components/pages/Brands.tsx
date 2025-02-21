import { getPopularBrands } from "@/lib/data/brand";
import { getImageUrl } from "@/lib/supabase";
import Image from "next/image";
import { Button } from "../ui/button";

async function Brands() {
  const popularBrands = await getPopularBrands();
  return (
    <section className="w-full space-y-4">
      {/* Brands Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">Brands</h2>
        <Button variant={"ghost"} className="border-2 font-semibold">
          Explore All
        </Button>
      </div>

      {/* Popular Brands Section */}
      <div className="w-full">
        {popularBrands.length ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {popularBrands.map((brand) => (
              <div
                key={brand.name}
                className="w-full rounded-xl border-2 p-4 shadow-md"
              >
                <Image
                  src={getImageUrl(brand.logo, "brands")}
                  width={200}
                  height={100}
                  alt={brand.name}
                  className="h-20 w-full object-contain"
                />
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
                No Brands Found
              </h4>
              <p className="desc-2 max-w-md text-xs md:text-sm">
                Showing the popular brands that are available on DealDome.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Brands;
