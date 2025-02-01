"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Location } from "@prisma/client";
import EditlocationDialog from "./EditLocationDialog";
import DeletelocationDialog from "./DeleteLocationDialog";

export const columns: ColumnDef<Location>[] = [
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
      const location = row.original;

      return (
        <div className="flex items-center gap-1">
          <EditlocationDialog locationData={location} />
          <DeletelocationDialog locationData={location} />
        </div>
      );
    },
  },
];
