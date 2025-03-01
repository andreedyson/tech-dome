"use client";

import { getImageUrl } from "@/lib/supabase";
import { convertRupiah, formatDate } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import OrderStatusBadge from "../OrderStausBadge";

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
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="inline-flex flex-col items-center gap-5 md:flex-row">
          {order.products.map((product, i) => (
            <div key={product.name + i}>
              <div className="size-20 rounded-lg object-contain">
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
    header: "Date",
    cell: ({ row }) => {
      const order = row.original;

      return <div>{formatDate(order.createdAt)}</div>;
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer",
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
