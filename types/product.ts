import { Brand, Category, Product } from "@prisma/client";

export type TopProductProps = Product & {
  category: Category;
};

export type ProductDetailProps = {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  categoryName: string;
  brandName: string;
  locationName: string;
  total_sales: number;
  createdAt: Date;
};

export type CartProps = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  categoryName: string;
  brandName: string;
  locationName: string;
  quantity: number;
};
