import React from "react";
import { Button } from "../ui/button";
import { getPopularBrands } from "@/lib/data/brand";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";

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
    </section>
  );
}

export default Brands;
