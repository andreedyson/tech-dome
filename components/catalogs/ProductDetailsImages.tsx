"use client";

import { getImageUrl } from "@/lib/supabase";
import { ProductDetailProps } from "@/types/product";
import Image from "next/image";
import { useState } from "react";

type ProductDetailsImagesProps = {
  product: ProductDetailProps;
};
function ProductDetailsImages({ product }: ProductDetailsImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);

  const handleImageChange = (index: number) => {
    setSelectedImage(product.images[index]);
  };
  return (
    <div className="flex flex-col gap-6 max-xl:items-center md:flex-row">
      {/* Product Images */}
      <div className="flex h-full flex-row justify-between gap-12 max-xl:order-1 md:flex-col lg:gap-6 xl:w-full">
        {product.images.map((img, index) => (
          <div
            key={index}
            className={`aspect-square size-full cursor-pointer rounded-xl lg:size-[120px] ${
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
              className="size-full rounded-xl object-contain ring-2 ring-slate-300"
            />
          </div>
        ))}
      </div>
      {/* Image Preview */}
      <div className="aspect-square size-full xl:size-[420px]">
        <Image
          src={getImageUrl(selectedImage as string, "products")}
          width={800}
          height={800}
          alt={product.name}
          className="size-full object-contain"
        />
      </div>
    </div>
  );
}

export default ProductDetailsImages;
