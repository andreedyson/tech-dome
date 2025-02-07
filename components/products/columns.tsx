"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductStatus } from "@prisma/client";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { currencyFormatterIDR, formatDate } from "@/lib/utils";
import ProductStatusBadge from "../ProductStatusBadge";

export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryName: string;
  brandName: string;
  locationName: string;
  total_sales: number;
  status: ProductStatus;
  createdAt: Date;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="inline-flex items-center gap-5">
          <div className="size-20 rounded-lg object-contain">
            <Image
              src={getImageUrl(product.imageUrl)}
              alt={product.name}
              width={80}
              height={80}
            />
          </div>
          <p>{product.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;

      return <ProductStatusBadge status={product.status} />;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="text-right">{currencyFormatterIDR(product.price)}</div>
      );
    },
  },
  {
    accessorKey: "total_sales",
    header: "Sales",
  },
  {
    accessorKey: "createdAt",
    header: "Added",
    cell: ({ row }) => {
      const product = row.original;

      return <div>{formatDate(product.createdAt)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <div className="flex items-center gap-1 text-right">
          {/* <EditBrandDialog brandData={brand} />
          <DeleteBrandDialog brandData={brand} /> */}
        </div>
      );
    },
  },
];
