"use client";

import { AllBrandProps } from "@/types/brand";
import { ColumnDef } from "@tanstack/react-table";
import { Boxes, Captions, LetterText } from "lucide-react";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import EditCategoryDialog from "./EditCategoryDialog";

export const columns: ColumnDef<AllBrandProps>[] = [
  {
    accessorKey: "id",
    header: () => {
      return (
        <div className="flex items-center gap-1">
          <Captions size={14} />
          ID
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
    accessorKey: "totalProducts",
    header: () => {
      return (
        <div className="flex items-center gap-1">
          <Boxes size={14} />
          Total Products
        </div>
      );
    },
    cell: ({ row }) => {
      const category = row.original;

      return <div>{category.totalProducts} Products</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex items-center gap-1">
          <EditCategoryDialog categoryData={category} />
          <DeleteCategoryDialog categoryData={category} />
        </div>
      );
    },
  },
];
