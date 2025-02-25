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
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <Image
          src={getImageUrl(product.image, "products")}
          width={80}
          height={80}
          alt={product.name}
          className="size-[80px] rounded-md object-cover"
        />
        <div>
          <p className="font-bold">{product.name}</p>
          <p className="text-sm font-medium text-muted-foreground">
            {product.quantity} x {convertRupiah(product.price)}
          </p>
        </div>
      </div>
      <p className="font-medium text-muted-foreground">
        {convertRupiah(product.quantity * product.price)}
      </p>
    </div>
  );
}

export default OrderHistoryProduct;
