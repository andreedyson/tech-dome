"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Location } from "@prisma/client";
import EditlocationDialog from "./EditLocationDialog";
import DeletelocationDialog from "./DeleteLocationDialog";
import { Captions, LetterText } from "lucide-react";

export const columns: ColumnDef<Location>[] = [
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
