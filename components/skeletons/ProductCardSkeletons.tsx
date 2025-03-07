import React from "react";
import { Skeleton } from "../ui/skeleton";

function ProductCardSkeletons() {
  return (
    <div className="rounded-xl border-2 shadow-md">
      <Skeleton className="aspect-square size-full rounded-t-xl border-b-2 object-cover" />

      <div className="p-4">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="mt-1 h-3 w-[80px]" />
        <Skeleton className="mt-2.5 h-3 w-full" />
        <Skeleton className="mt-1 h-3 w-[90%]" />
        <Skeleton className="mt-1 h-3 w-[80%]" />
        <Skeleton className="mt-4 h-3 w-[120px]" />
      </div>
    </div>
  );
}

export default ProductCardSkeletons;
