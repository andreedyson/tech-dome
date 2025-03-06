import React from "react";
import { Skeleton } from "../ui/skeleton";

function DashboardSkeletons() {
  return (
    <div className="w-full space-y-6">
      {/* Stats Card Skeletons */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton className="h-[100px] w-full" key={index} />
        ))}
      </div>

      {/* Products, Customers, Countries Overview Skeletons */}
      <div className="grid h-full w-full gap-4 md:grid-cols-4 lg:grid-cols-12 lg:grid-rows-2">
        <Skeleton className="h-[400px] md:col-span-4 md:h-[600px] lg:col-span-8 lg:row-span-2" />
        <Skeleton className="md:col-span-2 lg:col-span-4 lg:col-start-9" />
        <Skeleton className="md:col-span-2 lg:col-span-4 lg:col-start-9" />
      </div>

      {/* Latest Orders and Brand Performances Skeletons */}
      <div className="grid w-full gap-4 lg:grid-cols-12">
        <Skeleton className="h-[250px] w-full lg:col-span-8" />
        <Skeleton className="h-[250px] w-full lg:col-span-4" />
      </div>
    </div>
  );
}

export default DashboardSkeletons;
