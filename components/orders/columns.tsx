"use client";

import { convertRupiah, formatDate } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  Calendar,
  Captions,
  Coins,
  Loader,
  PackageOpen,
  User,
} from "lucide-react";
import Image from "next/image";
import OrderStatusBadge from "../OrderStatusBadge";

export type OrderColumn = {
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

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: () => (
      <div className="flex items-center gap-1">
        <Captions size={14} />
        ID
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-1">
        <PackageOpen size={14} />
        Products
      </div>
    ),
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="inline-flex flex-col items-center gap-5 md:flex-row">
          {order.products.map((product, i) => (
            <div key={product.name + i}>
              <div className="hidden size-20 rounded-lg object-contain md:block">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                />
              </div>
              <p>{product.name}</p>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center gap-1">
        <Calendar size={14} />
        Date
      </div>
    ),
    cell: ({ row }) => {
      const order = row.original;

      return <div>{formatDate(order.createdAt)}</div>;
    },
  },
  {
    accessorKey: "customerName",
    header: () => (
      <div className="flex items-center gap-1">
        <User size={14} />
        Customer
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: () => (
      <div className="flex items-center gap-1">
        <Coins size={14} />
        Price
      </div>
    ),
    cell: ({ row }) => {
      const order = row.original;

      return <div>{convertRupiah(order.total)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="flex items-center gap-1">
        <Loader size={14} />
        Status
      </div>
    ),
    cell: ({ row }) => {
      const order = row.original;

      return <OrderStatusBadge status={order.status} />;
    },
  },
];
