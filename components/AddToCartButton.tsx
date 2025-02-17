"use client";

import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { CartProps, ProductDetailProps } from "@/types/product";
import { getImageUrl } from "@/lib/supabase";
import { useCart } from "@/hooks/use-cart";
import { redirect, useRouter } from "next/navigation";

type AddToCartButtonProps = {
  product: ProductDetailProps;
  isLoggedIn: boolean;
};

function AddToCartButton({ product, isLoggedIn }: AddToCartButtonProps) {
  const { addProduct } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push("/sign-in");
    } else {
      const newCart: CartProps = {
        ...product,
        imageUrl: getImageUrl(product.images[0], "products"),
        quantity: 1,
      };

      addProduct(newCart);

      router.push("/cart");
    }
  };

  return (
    <Button onClick={handleAddToCart}>
      <ShoppingCart strokeWidth={3} />
      Add to Cart
    </Button>
  );
}

export default AddToCartButton;
