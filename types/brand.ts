import { Brand, Order, Product } from "@prisma/client";
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

export type BrandSalesProps = {
  brand: string;
  sales: number;
};

export type BrandHighestSellingProductsProps = Brand & {
  product: Product | undefined;
  totalOrder: number;
};
