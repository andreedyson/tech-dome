import { ProductStatus } from "@prisma/client";
import { Badge } from "./ui/badge";

type ProductStatusProps = {
  status: ProductStatus;
};

function ProductStatusBadge({ status }: ProductStatusProps) {
  const badgeColor = status === "PRE_ORDER" ? "bg-orange-500" : "bg-green-500";
  const statusText =
    status.split("_").length > 1 ? status.split("_").join("-") : status;

  return (
    <Badge
      className={`${badgeColor} rounded-full text-center text-[10px] leading-none`}
    >
      {statusText}
    </Badge>
  );
}

export default ProductStatusBadge;
