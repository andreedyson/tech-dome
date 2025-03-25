import {
  Brand,
  Category,
  Location,
  Product,
  ProductStatus,
} from "@prisma/client";

export type TopProductProps = Product & {
  category: Category;
  location: Location;
  totalOrders?: number;
};

export type ProductDetailProps = {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  stock: number;
  category?: Category;
  brand?: Brand;
  location?: Location;
  total_sales?: number;
  status: ProductStatus;
  createdAt: Date;
};

export type CartProps = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  categoryName?: string;
  brandName?: string;
  locationName?: string;
  quantity: number;
  createdAt: Date;
};

export type LowStockProductProps = {
  product: string;
  stock: number;
  color?: string;
};
