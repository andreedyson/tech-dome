"use client";

import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type CustomerColumn = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      const customer = row.original;

      return <div>{formatDate(customer.createdAt)}</div>;
    },
  },
];
