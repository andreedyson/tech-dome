import React from "react";
import { Button } from "../ui/button";
import { getNewReleaseProducts } from "@/lib/data/product";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { currencyFormatterIDR, formatDaysAgo } from "@/lib/utils";

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

      {/* Top Products Section */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {newReleases.map((product) => (
          <div key={product.id} className="rounded-xl border-2 shadow-md">
            {/* Product Image */}
            <Image
              src={getImageUrl(product.images[0], "products")}
              width={150}
              height={150}
              alt={product.name}
              className="w-full object-contain"
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
                {currencyFormatterIDR(product.price)}
              </p>

              <p className="mt-4 text-sm font-semibold text-muted-foreground">
                Added {formatDaysAgo(product.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewReleases;
