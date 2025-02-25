import { OrderStatus } from "@prisma/client";

export type UserOrderHistoryProps = {
  id: string;
  status: OrderStatus;
  total: number;
  updatedAt: Date;
  products: {
    name: string;
    image: string;
    quantity: number;
    price: number;
    category: string;
  }[];
};
