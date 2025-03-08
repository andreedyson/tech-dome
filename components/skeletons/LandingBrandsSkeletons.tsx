import React from "react";
import { Skeleton } from "../ui/skeleton";

function LandingBrandsSkeletons() {
  return (
    <div className="space-y-12">
      {/* Brands Banner Skeleton */}
      <Skeleton className="h-[350px] w-full rounded-xl md:h-[400px]" />

      {/* Top Brands by Product Count Skeletons */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-[450px]" />
        <div className="grid h-full w-full grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-4">
          <Skeleton className="h-[300px] rounded-lg py-8 md:col-span-2 md:row-span-4" />
          <Skeleton className="rounded-lg py-8 md:col-span-2 md:col-start-3 md:row-span-2" />
          <Skeleton className="rounded-lg py-8 md:col-start-3 md:row-span-2 md:row-start-3" />
          <Skeleton className="rounded-lg py-8 md:col-start-4 md:row-span-2 md:row-start-3" />
        </div>
      </div>

      {/* Brand with Products Section */}
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="aspect-video h-8 w-12 rounded-lg" />
            <Skeleton className="aspect-video h-8 w-32 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="flex w-full gap-3 rounded-xl border-2"
              >
                <Skeleton className="aspect-square size-full rounded-l-lg md:size-[180px]" />

                <div className="w-full p-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-4 w-20" />
                  <div className="mt-3">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="mt-1 h-3 w-[80%]" />
                    <Skeleton className="mt-1 h-3 w-[60%]" />
                  </div>
                  <Skeleton className="mt-4 h-3 w-[100px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LandingBrandsSkeletons;
