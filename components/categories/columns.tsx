"use client";

import { ColumnDef } from "@tanstack/react-table";
import EditCategoryDialog from "../dialogs/EditCategoryDialog";
import { Category } from "@prisma/client";

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
        <div>
          <EditCategoryDialog categoryData={category} />
        </div>
      );
    },
  },
];
