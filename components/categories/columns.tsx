"use client";

import { ColumnDef } from "@tanstack/react-table";
import EditCategoryDialog from "./EditCategoryDialog";
import { Category } from "@prisma/client";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
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
