"use client";

import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { CartProps, ProductDetailProps } from "@/types/product";
import { getImageUrl } from "@/lib/supabase";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

type AddToCartButtonProps = {
  product: ProductDetailProps;
};

function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addProduct } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    const newCart: CartProps = {
      ...product,
      imageUrl: getImageUrl(product.images[0], "products"),
      quantity: 1,
    };

    addProduct(newCart);

    router.push("/cart");
  };

  return (
    <Button onClick={handleAddToCart}>
      <ShoppingCart strokeWidth={3} />
      Add to Cart
    </Button>
  );
}

export default AddToCartButton;
