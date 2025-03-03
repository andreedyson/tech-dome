"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductStatus } from "@prisma/client";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { convertRupiah, formatDate } from "@/lib/utils";
import ProductStatusBadge from "../ProductStatusBadge";
import { Button } from "../ui/button";
import {
  Calendar,
  Coins,
  Loader,
  PackageOpen,
  Pencil,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import DeleteProductDialog from "./DeleteProductDialog";

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
    header: () => {
      return (
        <div className="flex items-center gap-1">
          <PackageOpen size={14} />
          Product
        </div>
      );
    },
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="inline-flex items-center gap-5">
          <div className="size-20 rounded-lg object-contain">
            <Image
              src={product.imageUrl}
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
    header: () => (
      <div className="flex items-center gap-1">
        <Loader size={14} />
        Status
      </div>
    ),
    cell: ({ row }) => {
      const product = row.original;

      return <ProductStatusBadge status={product.status} />;
    },
  },
  {
    accessorKey: "price",
    header: () => (
      <div className="flex items-center gap-1">
        <Coins size={14} />
        Price
      </div>
    ),
    cell: ({ row }) => {
      const product = row.original;

      return <div>{convertRupiah(product.price)}</div>;
    },
  },
  {
    accessorKey: "total_sales",
    header: () => (
      <div className="flex items-center gap-1">
        <ShoppingBag size={14} />
        Sales
      </div>
    ),
    cell: ({ row }) => {
      const product = row.original;

      return <div>{product.total_sales}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center gap-1">
        <Calendar size={14} />
        Added
      </div>
    ),
    cell: ({ row }) => {
      const product = row.original;

      return <div>{formatDate(product.createdAt)}</div>;
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
          <DeleteProductDialog productId={product.id} />
        </div>
      );
    },
  },
];
