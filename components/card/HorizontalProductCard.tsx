import { getImageUrl } from "@/lib/supabase";
import { TopProductProps } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { convertRupiah } from "@/lib/utils";

type HorizontalProductCardProps = {
  product: TopProductProps;
};

function HorizontalProductCard({ product }: HorizontalProductCardProps) {
  return (
    <Link
      key={product.id + product.name}
      href={`/product-details/${product.id}`}
      className="flex rounded-lg border-2 duration-200 hover:border-main-violet-800 max-md:w-full md:flex-shrink-0"
    >
      <div className="relative">
        <Image
          src={getImageUrl(product.images[0], "products")}
          width={180}
          height={180}
          alt={product.name}
          className="size-full rounded-l-lg object-cover md:size-[180px]"
        />
        <Badge className="absolute left-2 top-2 rounded-full text-xs">
          {product.category.name}
        </Badge>
      </div>
      <div className="p-4 leading-5">
        <p className="font-bold">{product.name}</p>
        <p className="text-sm font-semibold text-main-violet-500">
          {convertRupiah(product.price)}
        </p>
        <p className="mt-3 line-clamp-3 max-w-[300px] text-balance text-sm sm:max-w-[400px] md:w-[240px]">
          {product.description}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Delivered from {product.location.name}
        </p>
      </div>
    </Link>
  );
}

export default HorizontalProductCard;
