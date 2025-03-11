import React from "react";
import { Skeleton } from "../ui/skeleton";

function DashboardSectionSkeletons() {
  return (
    <div className="space-y-4 rounded-lg border-2 p-4">
      {/* Dashboard Section Header Skeletons */}
      <div>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="size-10" />
              <Skeleton className="h-10 w-[180px]" />
            </div>
            <Skeleton className="h-[10px] w-full max-w-[450px]" />
          </div>
          <div className="flex w-full justify-end">
            <Skeleton className="h-10 w-[140px] rounded-lg" />
          </div>
        </div>
      </div>

      {/* Dashboard Section Table Skeletons */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
        <div>
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    </div>
  );
}

export default DashboardSectionSkeletons;
