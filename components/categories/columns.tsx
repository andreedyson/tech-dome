"use client";

import { ColumnDef } from "@tanstack/react-table";
import EditCategoryDialog from "./EditCategoryDialog";
import { Category } from "@prisma/client";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import { LetterText, Captions } from "lucide-react";

export const columns: ColumnDef<Category>[] = [
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
