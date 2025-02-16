"use client";

import { getImageUrl } from "@/lib/supabase";
import { ProductDetailProps } from "@/types/product";
import Image from "next/image";
import React, { useState } from "react";

type ProductDetailsImagesProps = {
  product: ProductDetailProps;
};
function ProductDetailsImages({ product }: ProductDetailsImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);

  const handleImageChange = (index: number) => {
    setSelectedImage(product.images[index]);
  };
  return (
    <div className="flex gap-6">
      {/* Product Images */}
      <div className="flex h-full w-full flex-col justify-between gap-2">
        {product.images.map((img, index) => (
          <div
            key={index}
            className={`aspect-square size-[120px] cursor-pointer rounded-xl ${
              selectedImage === img
                ? "ring-4 ring-blue-500"
                : "ring-2 ring-slate-300"
            }`}
            onClick={() => handleImageChange(index)}
          >
            <Image
              src={getImageUrl(img, "products")}
              width={500}
              height={500}
              alt={product.name}
              className="size-full rounded-xl ring-2 ring-slate-300"
            />
          </div>
        ))}
      </div>
      {/* Image Preview */}
      <div className="aspect-square size-[420px]">
        <Image
          src={getImageUrl(selectedImage as string, "products")}
          width={800}
          height={800}
          alt={product.name}
          className="size-full"
        />
      </div>
    </div>
  );
}

export default ProductDetailsImages;
