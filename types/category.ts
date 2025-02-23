import { TopProductProps } from "./product";

export type TotalProductByCategoryProps = {
  name: string;
  totalProducts: number;
};

export type CategoryWithProductsProps = {
  id: number;
  name: string;
  products: TopProductProps[];
};
