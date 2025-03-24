import { Category } from "@prisma/client";
import { TopProductProps } from "./product";

export type AllCategoryProps = Category & {
  totalProducts: number;
};

export type TotalProductByCategoryProps = {
  name: string;
  totalProducts: number;
};

export type CategoryWithProductsProps = {
  id: number;
  name: string;
  products: TopProductProps[];
};
