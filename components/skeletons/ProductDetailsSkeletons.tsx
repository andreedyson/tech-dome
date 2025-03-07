import React from "react";
import { Skeleton } from "../ui/skeleton";

function ProductDetailsSkeletons() {
  return (
    <div className="space-y-4">
      {/* Product Details Header Skeletons */}
      <Skeleton className="h-4 w-[80px]" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>

      {/* Product Details Skeletons */}
      <div className="grid gap-5 md:grid-cols-7">
        <div className="space-y-2 md:col-span-2">
          <Skeleton className="aspect-square size-[320px] rounded-lg" />

          <div className="flex items-center justify-between gap-2">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton
                key={index}
                className="aspect-square size-12 rounded-md object-cover md:size-20"
              />
            ))}
          </div>
        </div>

        {/* Product Details Input Skeletons */}
        <div className="space-y-3 md:col-span-5">
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-2 w-[100px]" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
            ))}
          </div>

          <div className="w-full space-y-3">
            <Skeleton className="h-2 w-[100px]" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-2 w-[100px]" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
            ))}
          </div>

          <div className="w-full space-y-3">
            <Skeleton className="h-2 w-[100px]" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>

          <div className="mt-6 flex items-end justify-end gap-2">
            <Skeleton className="h-8 w-[150px]" />
            <Skeleton className="h-8 w-[150px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSkeletons;
