"use client";

import { useCart } from "@/hooks/use-cart";
import { getImageUrl } from "@/lib/supabase";
import { CartProps, ProductDetailProps } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type AddToCartButtonProps = {
  userId: string;
  product: ProductDetailProps;
  isLoggedIn: boolean;
  stock: number;
};

function AddToCartButton({
  userId,
  product,
  isLoggedIn,
  stock,
}: AddToCartButtonProps) {
  const { addProduct } = useCart(userId);
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
    <Button onClick={handleAddToCart} disabled={stock <= 0 ? true : false}>
      <ShoppingCart strokeWidth={3} />
      Add to Cart
    </Button>
  );
}

export default AddToCartButton;
