import { ProductColumn } from "@/components/products/columns";
import { prisma } from "../prisma";

export async function getAllProducts(): Promise<ProductColumn[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        brand: true,
        orders: true,
      },
    });

    const mappedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.images[0],
      categoryName: product.category.name,
      brandName: product.brand.name,
      total_sales: product.orders.length,
      status: product.status,
      createdAt: product.createdAt,
    }));

    return mappedProducts;
  } catch (error) {
    return [];
  }
}
