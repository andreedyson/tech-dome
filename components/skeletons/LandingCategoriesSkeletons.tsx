import React from "react";
import { Skeleton } from "../ui/skeleton";
import ProductCardSkeletons from "./ProductCardSkeletons";

function LandingCategoriesSkeletons() {
  return (
    <div>
      {/* Categories Banner Skeleton */}
      <Skeleton className="h-[350px] w-full rounded-xl md:h-[400px]" />

      {/* Shop by Category Skeletons */}
      <div className="mt-6 space-y-4">
        <Skeleton className="h-8 w-[350px]" />
        <div className="grid h-full w-full grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton
              key={index}
              className="h-[80px] w-full rounded-lg border-2"
            />
          ))}
        </div>
      </div>

      {/*  Categories with Products Skeletons */}
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="mt-12 grid w-full gap-4 lg:grid-cols-5">
          <div className="col-span-1 space-y-1">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
          <div className="col-span-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index}>
                <ProductCardSkeletons />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LandingCategoriesSkeletons;
