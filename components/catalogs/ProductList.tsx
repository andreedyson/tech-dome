"use client";

import { BASE_URL } from "@/constants";
import { Filter, useFilterCatalog } from "@/hooks/use-filter-catalog";
import { ProductDetailProps } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ProductCard from "../card/ProductCard";
import ProductCardSkeletons from "../skeletons/ProductCardSkeletons";
import { Button } from "../ui/button";

const fetchProducts = async (body?: Filter & { page?: number }) => {
  try {
    const res = await fetch(`${BASE_URL}/api/catalog`, {
      method: "POST",
      body: JSON.stringify({ ...body, limit: 12, page: body?.page ?? 1 }),
    });

    return await res.json();
  } catch (error) {
    return { products: [], totalPages: 1, currentPage: 1 };
  }
};

function ProductList() {
  const { filter } = useFilterCatalog();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["product-list", filter, page],
    queryFn: () => fetchProducts({ ...filter, page }),
  });

  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isLoading)
    return (
      <div className="grid h-full w-full grid-cols-2 gap-4 md:grid-cols-3">
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index}>
            <ProductCardSkeletons />
          </div>
        ))}
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid h-full w-full grid-cols-2 gap-4 md:grid-cols-3">
        {products.length > 0 ? (
          products.map((product: ProductDetailProps) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex w-full items-center justify-between md:mt-4">
          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`rounded-md px-4 py-2 ${
                page === 1
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "border-2 bg-white text-black hover:bg-transparent"
              }`}
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`rounded-md px-4 py-2 ${
                page === totalPages
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "border-2 bg-white text-black hover:bg-transparent"
              }`}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
