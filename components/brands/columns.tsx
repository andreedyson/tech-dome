"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Brand } from "@prisma/client";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import EditBrandDialog from "./EditBrandDialog";
import DeleteBrandDialog from "./DeleteBrandDialog";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="inline-flex items-center gap-4">
          <div className="size-20 rounded-lg">
            <Image
              src={getImageUrl(brand.logo, "brands")}
              alt={brand.name}
              width={80}
              height={80}
              className="size-20 object-contain"
            />
          </div>
          <p>{brand.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <div className="flex items-center gap-1">
          <EditBrandDialog brandData={brand} />
          <DeleteBrandDialog brandData={brand} />
        </div>
      );
    },
  },
];
