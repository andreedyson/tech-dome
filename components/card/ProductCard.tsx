import { getImageUrl } from "@/lib/supabase";
import { convertRupiah } from "@/lib/utils";
import { ProductDetailProps } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

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
        <div className="relative">
          <Image
            src={getImageUrl(product.images[0], "products")}
            width={150}
            height={150}
            alt={product.name}
            className="aspect-square size-full rounded-t-xl border-b-2 object-cover"
          />
          <Badge className="absolute left-2 top-2 rounded-full text-xs">
            {product.category?.name}
          </Badge>
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h4 className="line-clamp-1 text-base font-bold md:text-lg">
            {product.name}
          </h4>
          <p className="text-sm font-medium text-muted-foreground">
            {product.total_sales} Sold • {product.stock} Items
          </p>
          <div className="mt-1.5 flex items-center gap-2 text-sm">
            <Image
              src={getImageUrl(product.brand?.logo as string, "brands")}
              width={100}
              height={80}
              alt={product.brand?.name || ""}
              className="aspect-video w-12 rounded-lg border-2 object-contain 2xl:w-16"
            />
            <p>{product.brand?.name}</p>
          </div>
          <p className="mt-2 line-clamp-3 h-max text-sm leading-5 tracking-tight">
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
