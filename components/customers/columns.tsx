"use client";

import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { AtSign, Calendar, LetterText } from "lucide-react";

export type CustomerColumn = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-1">
        <LetterText size={14} />
        Name
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="flex items-center gap-1">
        <AtSign size={14} />
        Email
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center gap-1">
        <Calendar size={14} />
        Joined
      </div>
    ),
    cell: ({ row }) => {
      const customer = row.original;

      return <div>{formatDate(customer.createdAt)}</div>;
    },
  },
];
