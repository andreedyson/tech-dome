"use client";

import { convertRupiah, formatDate } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import OrderStatusBadge from "../OrderStausBadge";

export type LatestOrderColumn = {
  id: number;
  products: {
    name: string;
    image: string;
  }[];
  customerName: string;
  total: number;
  status: OrderStatus;
  createdAt: Date;
};

export const columns: ColumnDef<LatestOrderColumn>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const order = row.original;

      return <div>{formatDate(order.createdAt)}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => {
      const order = row.original;

      return <div>{order.id}</div>;
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="inline-flex flex-col items-center gap-5 md:flex-row">
          {order.products.map((product, i) => (
            <p key={product.name + i}>{product.name}</p>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const order = row.original;

      return <div>{convertRupiah(order.total)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const order = row.original;

      return <OrderStatusBadge status={order.status} />;
    },
  },
];
