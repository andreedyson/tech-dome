import { Brand, Product } from "@prisma/client";
import { TopProductProps } from "./product";

export type AllBrandProps = Brand & {
  totalProducts: number;
  totalOrders: number;
};

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

export type BrandTotalProductsProps = Brand & {
  totalProducts: number;
};
