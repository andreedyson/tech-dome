import { currencyFormatterIDR } from "@/lib/utils";
import { ProductCardProps } from "@/types/product";
import Image from "next/image";

type ProductProps = {
  product: ProductCardProps;
};

function ProductCard({ product }: ProductProps) {
  return (
    <article className="rounded-xl border-2 shadow-md">
      {/* Product Image */}
      <Image
        src={product.imageUrl}
        width={150}
        height={150}
        alt={product.name}
        className="w-full object-contain"
      />
      {/* Product Details */}
      <div className="p-4">
        <h4 className="line-clamp-1 text-base font-bold md:text-lg">
          {product.name}
        </h4>
        <p className="text-sm font-medium text-muted-foreground">
          {product.categoryName}
        </p>
        <p className="mt-2.5 line-clamp-3 leading-5 tracking-tight">
          {product.description}
        </p>
        <p className="mt-2 text-base font-bold text-main-violet-700 md:mt-3 md:text-lg">
          {currencyFormatterIDR(product.price)}
        </p>
      </div>
    </article>
  );
}

export default ProductCard;
