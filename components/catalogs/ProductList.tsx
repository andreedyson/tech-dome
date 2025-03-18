"use client";

import { BASE_URL } from "@/constants";
import { Filter, useFilterCatalog } from "@/hooks/use-filter-catalog";
import { ProductDetailProps } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../card/ProductCard";
import Image from "next/image";
import ProductCardSkeletons from "../skeletons/ProductCardSkeletons";

const fetchProducts = async (body?: Filter): Promise<ProductDetailProps[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/catalog`, {
      method: "POST",
      body: JSON.stringify(body ?? {}),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return [];
  }
};

function ProductList() {
  const { filter } = useFilterCatalog();
  const { data: products, isLoading } = useQuery({
    queryKey: ["product-list", filter],
    queryFn: () => fetchProducts(filter),
  });

  if (isLoading)
    return (
      <div className="mt-6 grid w-full grid-cols-2 gap-4 text-center md:grid-cols-3">
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index}>
            <ProductCardSkeletons />
          </div>
        ))}
      </div>
    );

  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
      {products && products.length > 0 ? (
        products?.map((product) => (
          <ProductCard key={product.id + product.name} product={product} />
        ))
      ) : (
        <div className="col-span-full flex h-[90%] flex-col items-center justify-center gap-2 text-center">
          <Image
            src={"/assets/empty-products.svg"}
            width={500}
            height={300}
            alt="Products Not Found"
            className="aspect-video size-[180px] lg:size-[400px]"
            priority
          />
          <div className="space-y-0.5">
            <h4 className="text-base font-semibold md:text-lg">
              No Products Found
            </h4>
            <p className="max-w-md text-sm md:text-base">
              Showing the list of Products available on TechDome.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
