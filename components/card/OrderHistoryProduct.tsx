import { getImageUrl } from "@/lib/supabase";
import { convertRupiah } from "@/lib/utils";
import Image from "next/image";

type OrderHistoryProductProps = {
  product: {
    name: string;
    image: string;
    quantity: number;
    price: number;
  };
};

function OrderHistoryProduct({ product }: OrderHistoryProductProps) {
  return (
    <div className="flex w-full items-center">
      <div className="flex w-full items-center gap-3">
        <Image
          src={getImageUrl(product.image, "products")}
          width={80}
          height={80}
          alt={product.name}
          className="size-[80px] rounded-md object-cover"
        />
        <div className="flex w-full flex-col justify-between md:flex-row md:items-center">
          <div>
            <p className="line-clamp-1 font-bold">{product.name}</p>
            <p className="text-xs font-medium text-muted-foreground md:text-sm">
              {product.quantity} x {convertRupiah(product.price)}
            </p>
          </div>
          <p className="text-sm font-semibold text-muted-foreground max-md:mt-1 md:text-base">
            {convertRupiah(product.quantity * product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryProduct;
