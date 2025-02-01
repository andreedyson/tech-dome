import AddlocationDialog from "@/components/categories/AddCategoryDialog";
import { columns as ColumnLocation } from "@/components/locations/columns";
import { DataTable } from "@/components/ui/data-table";
import { validateProtected } from "@/lib/check-session";
import { getAllLocations } from "@/lib/data/locations";
import { MapPin } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Categories",
};

async function LocationsPage() {
  const locationsData = await getAllLocations();
  const { session } = await validateProtected();

  return (
    <section className="space-y-4">
      <div className="space-y-3 rounded-lg bg-muted p-4">
        {/* Locatioons Page Header */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full space-y-2">
            <h2 className="flex items-center gap-2 text-2xl font-bold leading-none md:text-3xl">
              <MapPin className="size-6 md:size-8" />
              Locations
            </h2>
            <p className="max-w-[500px] text-sm leading-none text-muted-foreground md:text-base">
              Manage, visualize and gain insights and control over your site's
              geographical data
            </p>
          </div>
          <div className="flex w-full justify-end">
            <AddlocationDialog userId={session.userId as string} />
          </div>
        </div>
        {/* Data Table */}
        <div>
          <DataTable columns={ColumnLocation} data={locationsData} />
        </div>
      </div>
    </section>
  );
}

export default LocationsPage;
