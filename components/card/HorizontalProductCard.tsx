import { getImageUrl } from "@/lib/supabase";
import { convertRupiah } from "@/lib/utils";
import { ProductDetailProps } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

type HorizontalProductCardProps = {
  product: ProductDetailProps;
};

function HorizontalProductCard({ product }: HorizontalProductCardProps) {
  return (
    <Link
      key={product.id + product.name}
      href={`/product-details/${product.id}`}
      className="flex rounded-lg border-2 duration-200 hover:border-main-violet-800 max-md:w-full md:flex-shrink-0"
    >
      <div className="relative">
        <Image
          src={getImageUrl(product.images[0], "products")}
          width={180}
          height={180}
          alt={product.name}
          className="aspect-square size-full rounded-l-lg object-contain md:size-[180px] md:object-cover"
        />
        <Badge className="absolute left-2 top-2 line-clamp-1 w-fit rounded-full text-xs max-md:max-w-[100px]">
          {product?.category?.name}
        </Badge>
      </div>
      <div className="p-4 leading-5">
        <p className="font-bold">{product.name}</p>
        <p className="text-sm font-semibold text-main-violet-500">
          {convertRupiah(product.price)}
        </p>
        <p className="mt-3 line-clamp-3 max-w-[300px] text-balance text-sm sm:max-w-[400px] lg:w-[240px]">
          {product.description}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Delivered from {product?.location?.name}
        </p>
      </div>
    </Link>
  );
}

export default HorizontalProductCard;
