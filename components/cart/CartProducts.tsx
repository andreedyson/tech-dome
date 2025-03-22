"use client";

import { useCart } from "@/hooks/use-cart";
import { convertRupiah } from "@/lib/utils";
import { ChevronLeft, Minus, Plus, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

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
              className="flex items-center gap-6 rounded-lg border-2 p-4"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={100}
                height={100}
                className="size-[150px] rounded-xl object-cover md:size-[100px]"
              />
              {/* Cart Product Details */}
              <div className="grid w-full grid-cols-2 lg:grid-cols-4">
                <div className="max-md:col-span-2">
                  <h4 className="line-clamp-2 text-xl font-bold">
                    {product.name}
                  </h4>
                  <p className="text-muted-foreground">
                    {product.categoryName}
                  </p>
                </div>
                <div className="max-md:col-span-2">
                  <p className="hidden font-semibold text-muted-foreground md:block">
                    Price
                  </p>
                  <p className="font-bold text-main-violet-500 max-md:mt-3">
                    {convertRupiah(product.price)}
                  </p>
                </div>
                <div className="max-md:col-span-2 max-md:mt-6 max-sm:mt-3">
                  <p className="font-semibold text-muted-foreground">
                    Quantity
                  </p>
                  <div className="flex items-center gap-3">
                    <Minus
                      onClick={() => decreaseQuantity(product.id)}
                      className="size-5 cursor-pointer rounded-full bg-black"
                      color="white"
                    />
                    <span className="text-lg font-bold text-main-violet-500">
                      {product.quantity}
                    </span>
                    <Plus
                      onClick={() => increaseQuantity(product.id)}
                      className="size-5 cursor-pointer rounded-full bg-black"
                      color="white"
                    />
                  </div>
                </div>
                <div className="max-md:col-span-2 max-md:mt-6 max-sm:mt-3">
                  <p className="font-semibold text-muted-foreground">Total</p>
                  <p className="font-bold text-main-violet-500">
                    {convertRupiah(product.price * product.quantity)}
                  </p>
                </div>
              </div>
              <div
                onClick={() => removeProduct(product.id)}
                className="flex size-10 cursor-pointer items-center justify-center"
              >
                <Trash2 color="red" />
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
