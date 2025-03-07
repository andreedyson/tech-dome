import React from "react";
import { Skeleton } from "../ui/skeleton";

function ProductDetailsSkeletons() {
  return (
    <div className="space-y-8">
      {/* Product Detais Breadcrumb Skeletons */}
      <div className="flex items-center gap-4">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-3.5 w-[60px]" />
        ))}
      </div>

      <div className="flex flex-col gap-12 xl:flex-row">
        {/* Product Images Skeletons */}
        <div className="flex flex-col gap-6 max-xl:items-center md:flex-row">
          <div className="flex h-full flex-row justify-between gap-12 max-xl:order-1 md:flex-col lg:gap-6 xl:w-full">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton
                key={index}
                className="aspect-square size-full rounded-xl lg:size-[120px]"
              />
            ))}
          </div>

          <div className="aspect-square size-full xl:size-[420px]">
            <Skeleton className="size-full" />
          </div>
        </div>

        {/* Product Details Skeletons */}
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-12 w-[300px]" />
              <div className="mt-1 flex items-center gap-3 md:mt-2">
                <Skeleton className="h-3 w-[80px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
            </div>
            <Skeleton className="h-4 w-[130px]" />
          </div>

          <div className="mt-2 flex items-center gap-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="size-[16px]" />
          </div>

          <Skeleton className="my-4 h-2 w-full" />

          <div className="space-y-2">
            <Skeleton className="h-6 w-[150px]" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-[450px]" />
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[450px]" />
              <Skeleton className="h-4 w-[350px]" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>

          <Skeleton className="my-4 h-2 w-full" />

          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-8 w-[150px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSkeletons;
