"use client";

import { getImageUrl } from "@/lib/supabase";
import { AllBrandProps } from "@/types/brand";
import { ColumnDef } from "@tanstack/react-table";
import { Building, LetterText, ReceiptText } from "lucide-react";
import Image from "next/image";
import DeleteBrandDialog from "./DeleteBrandDialog";
import EditBrandDialog from "./EditBrandDialog";

export const columns: ColumnDef<AllBrandProps>[] = [
  {
    accessorKey: "logo",
    header: () => {
      return (
        <div className="flex items-center gap-1">
          <Building size={14} />
          Logo
        </div>
      );
    },
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="size-16 rounded-lg md:size-20">
          <Image
            src={getImageUrl(brand.logo, "brands")}
            alt={brand.name}
            width={80}
            height={80}
            className="size-16 object-contain md:size-20"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => {
      return (
        <div className="flex items-center gap-1">
          <LetterText size={14} />
          Name
        </div>
      );
    },
  },
  {
    accessorKey: "totalOrders",
    header: () => {
      return (
        <div className="flex items-center gap-1">
          <ReceiptText size={14} />
          Total Orders
        </div>
      );
    },
    cell: ({ row }) => {
      const brand = row.original;

      return <div>{brand.totalOrders} Orders</div>;
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
