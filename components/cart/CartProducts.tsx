"use client";

import { useCart } from "@/hooks/use-cart";
import { currencyFormatterIDR } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

function CartProducts() {
  const { products, increaseQuantity, decreaseQuantity, removeProduct } =
    useCart();

  return (
    <div>
      {products.map((product) => (
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
              <h4 className="text-xl font-bold">{product.name}</h4>
              <p className="text-muted-foreground">{product.categoryName}</p>
            </div>
            <div className="max-md:col-span-2">
              <p className="hidden font-semibold text-muted-foreground md:block">
                Price
              </p>
              <p className="font-bold text-main-violet-500 max-md:mt-3">
                {currencyFormatterIDR(product.price)}
              </p>
            </div>
            <div className="max-md:col-span-2 max-md:mt-6 max-sm:mt-3">
              <p className="font-semibold text-muted-foreground">Quantity</p>
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
                {currencyFormatterIDR(product.price * product.quantity)}
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
      ))}
    </div>
  );
}

export default CartProducts;
