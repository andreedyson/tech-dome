"use client";

import { getImageUrl } from "@/lib/supabase";
import { currencyFormatterIDR, formatDate } from "@/lib/utils";
import { OrderStatus, Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import OrderStatusBadge from "../OrderStausBadge";
import { Button } from "../ui/button";

export type OrderColumn = {
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

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="inline-flex items-center gap-5">
          {order.products.map((product) => (
            <div>
              <div className="size-20 rounded-lg object-contain">
                <Image
                  src={getImageUrl(product.image, "products")}
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

      return <div>{currencyFormatterIDR(order.total)}</div>;
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
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-1 text-right">
          <Link href={`/dashboard/products/edit/${product.id}`}>
            <Button
              variant={"ghost"}
              className="flex items-center gap-2 bg-yellow-500 text-sm text-white duration-200 hover:bg-yellow-400"
            >
              <Pencil size={16} />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
