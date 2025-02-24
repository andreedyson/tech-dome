import { Brand, Category, Location, Product } from "@prisma/client";

export type TopProductProps = Product & {
  category: Category;
  location: Location;
};

export type ProductDetailProps = {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  category?: Category;
  brand?: Brand;
  location?: Location;
  total_sales?: number;
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
