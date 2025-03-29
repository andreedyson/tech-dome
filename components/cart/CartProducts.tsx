"use client";

import { useCart } from "@/hooks/use-cart";
import { convertRupiah } from "@/lib/utils";
import { ChevronLeft, Minus, Plus, Trash, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

function CartProducts() {
  const {
    products,
    increaseQuantity,
    decreaseQuantity,
    removeProduct,
    clearCart,
  } = useCart();

  return (
    <div>
      <div className="w-full space-y-4">
        {products.length > 0 ? (
          products.map((product) => (
            <article
              key={product.id}
              className="relative flex flex-col rounded-lg border-2 p-2.5 md:p-4"
            >
              <div className="flex gap-3">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="aspect-square size-[80px] rounded-lg border object-cover md:size-[100px]"
                />
                {/* Cart Product Details */}
                <div className="flex w-full flex-col text-sm md:flex-row md:items-center md:justify-between md:text-base">
                  <h4 className="line-clamp-1 font-semibold">{product.name}</h4>
                  <p className="text-muted-foreground">
                    {product.category?.name}
                  </p>
                  <div className="flex items-center gap-3 max-md:my-1.5">
                    <Minus
                      onClick={() => decreaseQuantity(product.id)}
                      className="size-4 cursor-pointer rounded-full bg-black md:size-5"
                      color="white"
                    />
                    <span className="text-lg font-bold text-main-violet-500">
                      {product.quantity}
                    </span>
                    <Plus
                      onClick={() => increaseQuantity(product.id)}
                      className="size-4 cursor-pointer rounded-full bg-black md:size-5"
                      color="white"
                    />
                  </div>
                  <p className="font-bold text-main-violet-500">
                    {convertRupiah(product.price)}
                  </p>
                </div>
              </div>

              <Separator className="my-3 h-[1px]" />

              {/* Product Total Details */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm md:text-base">
                  <p className="font-medium text-muted-foreground">Total</p>
                  <p className="font-bold text-main-violet-500">
                    {convertRupiah(product.price * product.quantity)}
                  </p>
                </div>
                <div
                  className="absolute right-3 text-red-500"
                  onClick={() => removeProduct(product.id)}
                >
                  <Trash2 className="size-4 md:size-6" />
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="flex h-full w-full flex-col items-center gap-2 text-center">
            <Image
              src={"/assets/empty-cart.svg"}
              width={500}
              height={300}
              alt="Products Not Found"
              className="aspect-video size-[180px] lg:size-[280px]"
              priority
            />
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold md:text-base">
                No Products in Cart Yet
              </h4>
              <Link
                href={"/catalogs"}
                className="flex max-w-md items-center text-xs hover:underline md:text-sm"
              >
                <ChevronLeft size={16} />
                Checkout some products
              </Link>
            </div>
          </div>
        )}
      </div>
      {products.length > 0 && (
        <div className="mt-4 flex w-full justify-end font-semibold">
          <Button variant="outline" size={"sm"} onClick={() => clearCart()}>
            <Trash />
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
}

export default CartProducts;
