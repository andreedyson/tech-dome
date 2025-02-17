"use client";

import { useCart } from "@/hooks/use-cart";
import { currencyFormatterIDR } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

function CartProducts() {
  const { products } = useCart();

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
            className="rounded-xl"
          />
          {/* Cart Product Details */}
          <div className="grid w-full grid-cols-4">
            <div>
              <h4 className="text-xl font-bold">{product.name}</h4>
              <p className="text-muted-foreground">{product.categoryName}</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Price</p>
              <p className="font-bold text-main-violet-500">
                {currencyFormatterIDR(product.price)}
              </p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Quantity</p>
              <div className="flex items-center gap-3">
                <Minus className="size-5 rounded-full bg-black" color="white" />
                <span className="text-lg font-bold text-main-violet-500">
                  {product.quantity}
                </span>
                <Plus className="size-5 rounded-full bg-black" color="white" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Total</p>
              <p className="font-bold text-main-violet-500">
                {currencyFormatterIDR(product.price * product.quantity)}
              </p>
            </div>
          </div>
          <div className="flex size-10 items-center justify-center">
            <Trash2 color="red" />
          </div>
        </article>
      ))}
    </div>
  );
}

export default CartProducts;
