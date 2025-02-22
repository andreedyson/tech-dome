import { TopProductProps } from "./product";

export type BrandWithTotalProductsProps = {
  id: number;
  name: string;
  logo: string;
  totalProducts: number;
};

export type BrandWithProductsProps = {
  id: number;
  name: string;
  logo: string;
  products: TopProductProps[];
};
