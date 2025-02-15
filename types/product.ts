import { Category, Product } from "@prisma/client";

export type TopProductProps = Product & {
  category: Category;
};

export type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  categoryName: string;
  price: number;
};
