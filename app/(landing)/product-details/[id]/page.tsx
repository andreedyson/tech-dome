import ProductDetailsBreadcrumb from "@/components/catalogs/ProductDetailsBreadcrumb";
import { getProductById } from "@/lib/data/product";
import { getImageUrl } from "@/lib/supabase";
import { currencyFormatterIDR } from "@/lib/utils";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

async function ProductDetailsPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const product = await getProductById(id);

  if (!product) {
    redirect("/catalogs");
  }

  return (
    <section className="mt-8 w-full space-y-8">
      <ProductDetailsBreadcrumb
        product={{
          id: product.id,
          name: product.name,
        }}
      />

      {/* Product */}
      <div className="flex gap-12">
        {/* Product Images */}
        <div className="aspect-square size-[400px]">
          <Image
            src={getImageUrl(product.images[0] as string, "products")}
            width={800}
            height={800}
            alt={product.name}
            className="size-full"
          />
        </div>
        {/* Product Details */}
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold md:text-5xl">{product.name}</h1>
              <div>
                <p className="mt-2 font-semibold text-muted-foreground">
                  {product.categoryName} • {product.brandName}
                </p>
              </div>
            </div>
            <div>
              <p className="flex items-center gap-1">
                <MapPin size={16} />
                {product.locationName}
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} fill="orange" stroke="orange" size={22} />
              ))}
            </div>
            <span className="font-semibold">({product.total_sales})</span>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">About Products</h3>
            <p className="text-justify">{product.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold md:text-3xl">
              {currencyFormatterIDR(product.price)}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
