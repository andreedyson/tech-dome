import { getImageUrl } from "@/lib/supabase";
import { currencyFormatterIDR } from "@/lib/utils";
import Image from "next/image";
import React from "react";

function ProductCard() {
  return (
    <article className="rounded-xl border-2 shadow-md">
      {/* Product Image */}
      <Image
        src={getImageUrl("", "products")}
        width={150}
        height={150}
        alt={""}
        className="w-full object-contain"
      />
      {/* Product Details */}
      <div className="p-4">
        <h4 className="line-clamp-1 text-base font-bold md:text-lg">
          Product 1
        </h4>
        <p className="text-sm font-medium text-muted-foreground">Audio</p>
        <p className="mt-2.5 line-clamp-3 leading-5 tracking-tight">
          Ini merupakan deskripsi produk pertama yang digunakan sebagai template
          untuk Product Card
        </p>
        <p className="mt-2 text-base font-bold text-main-violet-700 md:mt-3 md:text-lg">
          {currencyFormatterIDR(0)}
        </p>
      </div>
    </article>
  );
}

export default ProductCard;
