import { getImageUrl } from "@/lib/supabase";
import { convertRupiah } from "@/lib/utils";
import { ProductDetailProps } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

type ProductProps = {
  product: ProductDetailProps;
};

function ProductCard({ product }: ProductProps) {
  return (
    <Link
      href={`/product-details/${product.id}`}
      className="rounded-xl duration-200 hover:ring-2 hover:ring-main-violet-500"
    >
      <article className="rounded-xl border-2 shadow-md">
        {/* Product Image */}
        <Image
          src={getImageUrl(product.images[0], "products")}
          width={150}
          height={150}
          alt={product.name}
          className="w-full rounded-xl object-contain"
        />
        {/* Product Details */}
        <div className="p-4">
          <h4 className="line-clamp-1 text-base font-bold md:text-lg">
            {product.name}
          </h4>
          <p className="text-sm font-medium text-muted-foreground">
            {product.categoryName}
          </p>
          <p className="mt-2.5 line-clamp-3 text-sm leading-5 tracking-tight">
            {product.description}
          </p>
          <p className="mt-2 text-base font-bold text-main-violet-700 md:mt-3 md:text-lg">
            {convertRupiah(product.price)}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;
