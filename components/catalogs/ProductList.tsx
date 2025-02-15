"use client";

import { BASE_URL } from "@/constants";
import { Filter, useFilterCatalog } from "@/hooks/useFilterCatalog";
import { ProductCardProps } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../card/ProductCard";

const fetchProducts = async (body?: Filter): Promise<ProductCardProps[]> => {
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
    return <div className="mt-6 w-full text-center">Loading...</div>;
  return (
    <div className="grid w-full grid-cols-2 md:grid-cols-3">
      {products && products.length > 0 ? (
        products?.map((product) => (
          <ProductCard
            key={product.id + product.name}
            product={{
              id: product.id,
              name: product.name,
              description: product.description,
              categoryName: product.categoryName,
              imageUrl: product.imageUrl,
              price: product.price,
            }}
          />
        ))
      ) : (
        <div className="col-span-3 mt-6 w-full text-center">
          No products found
        </div>
      )}
    </div>
  );
}

export default ProductList;
