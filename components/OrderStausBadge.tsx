import React from "react";
import { Badge } from "./ui/badge";
import { OrderStatus } from "@prisma/client";

type OrderStatusProps = {
  status: OrderStatus;
};

function OrderStatusBadge({ status }: OrderStatusProps) {
  let badgeColor: string;

  switch (status) {
    case "PENDING":
      badgeColor = "bg-orange-500";
      break;
    case "SUCCESS":
      badgeColor = "bg-green-500";
      break;
    default:
      badgeColor = "bg-gray-500";
      break;
  }

  return <Badge className={`${badgeColor} rounded-full`}>{status}</Badge>;
}

export default OrderStatusBadge;
