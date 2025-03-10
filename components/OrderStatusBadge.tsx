import React from "react";
import { Badge } from "./ui/badge";
import { OrderStatus } from "@prisma/client";
import { Check, Loader } from "lucide-react";

type OrderStatusProps = {
  status: OrderStatus;
};

function OrderStatusBadge({ status }: OrderStatusProps) {
  let badgeColor: string;

  switch (status) {
    case "PENDING":
      badgeColor = "border-2 bg-orange-200 text-orange-600 border-orange-500";
      break;
    case "SUCCESS":
      badgeColor = "border-2 bg-green-200 text-green-600 border-green-500";
      break;
    default:
      badgeColor = "bg-gray-500";
      break;
  }

  return (
    <Badge className={`${badgeColor} rounded-full`}>
      {status === "PENDING" ? (
        <Loader size={14} strokeWidth={3} className="mr-1" />
      ) : (
        <Check size={14} strokeWidth={3} className="mr-1" />
      )}
      {status === "PENDING" ? "Pending" : "Success"}
    </Badge>
  );
}

export default OrderStatusBadge;
