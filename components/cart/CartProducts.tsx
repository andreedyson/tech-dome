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
              <div className="flex items-center gap-2 md:gap-4">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="aspect-square size-[80px] rounded-lg border object-cover md:size-[100px]"
                />

                <div className="grid w-full grid-cols-1 gap-1.5 sm:grid-cols-4 sm:gap-3">
                  {/* Cart Product Details */}
                  <div>
                    <h4 className="line-clamp-1 font-semibold">
                      {product.name}
                    </h4>
                    <p className="text-muted-foreground">
                      {product.category?.name}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-sm leading-none max-sm:mt-1 sm:items-center md:text-base">
                    <p className="font-semibold max-sm:hidden">Stock</p>
                    <p>{product.stock} Left</p>
                  </div>
                  <div className="flex flex-col gap-1 text-sm leading-none sm:items-center md:text-base">
                    <p className="font-semibold max-sm:hidden">Quantity</p>
                    <div className="flex items-center gap-3 max-sm:my-1.5">
                      <Button
                        onClick={() => decreaseQuantity(product.id)}
                        size={"icon"}
                        className="bg-transparent hover:bg-muted-foreground/30"
                      >
                        <Minus
                          className="size-4 cursor-pointer rounded-full bg-black md:size-5"
                          color="white"
                        />
                      </Button>
                      <span className="text-lg font-bold text-main-violet-500">
                        {product.quantity}
                      </span>
                      <Button
                        onClick={() => increaseQuantity(product.id)}
                        disabled={product.quantity >= product.stock}
                        size={"icon"}
                        className="bg-transparent hover:bg-muted-foreground/30"
                      >
                        <Plus
                          className="size-4 cursor-pointer rounded-full bg-black md:size-5"
                          color="white"
                        />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-sm leading-none sm:items-center md:text-base">
                    <p className="font-semibold max-sm:hidden">Price</p>
                    <p className="font-bold text-main-violet-500">
                      {convertRupiah(product.price)}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-3 h-[1px]" />

              {/* Product Total Details */}
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="bg-transparent text-xs text-red-500 hover:text-red-800"
                  onClick={() => removeProduct(product.id)}
                >
                  <Trash2 className="size-4 md:size-6" />
                </Button>
                <div className="flex items-center gap-3 text-sm md:text-base">
                  <p className="font-medium text-muted-foreground">Total</p>
                  <p className="font-bold text-main-violet-500">
                    {convertRupiah(product.price * product.quantity)}
                  </p>
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
