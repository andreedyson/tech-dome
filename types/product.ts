import { Category, Order, Product } from "@prisma/client";

export type TopProductProps = Product & {
  category: Category;
};
