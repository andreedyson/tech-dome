"use client";

import { convertRupiah, formatDate } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import OrderStatusBadge from "../OrderStatusBadge";

export type LatestOrderColumn = {
  id: string;
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
        <div className="inline-flex flex-col gap-1">
          {order.products.map((product, i) => (
            <p key={product.name + i} className="line-clamp-1">
              {product.name}
            </p>
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
