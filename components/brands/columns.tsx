"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Brand } from "@prisma/client";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div>
          <Image
            src={getImageUrl(brand.logo)}
            alt={brand.name}
            width={80}
            height={80}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Brand",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      return <div className="flex items-center gap-1"></div>;
    },
  },
];
