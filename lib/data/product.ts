import { ProductColumn } from "@/components/products/columns";
import { prisma } from "../prisma";
import { Product } from "@prisma/client";
import { TopProductProps } from "@/types/product";

export async function getAllProducts(): Promise<ProductColumn[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        brand: true,
        location: true,
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
      locationName: product.location.name,
      total_sales: product.orders.length,
      status: product.status,
      createdAt: product.createdAt,
    }));

    return mappedProducts;
  } catch (error) {
    return [];
  }
}

export async function getProductById(
  productId: string,
): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    return null;
  }
}

export async function getTopProducts(): Promise<TopProductProps[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        orders: true,
        category: true,
      },
    });

    // TODO: Add filter to product with order more than or equals to 5
    const topProducts = products.filter((product) => product);

    return topProducts;
  } catch (error) {
    return [];
  }
}

export async function getNewReleaseProducts(): Promise<TopProductProps[]> {
  try {
    const currentDate = new Date();

    // Calculate the date two weeks ago
    const pastTwoWeeks = new Date(currentDate);
    pastTwoWeeks.setDate(currentDate.getDate() - 14);

    const newReleases = await prisma.product.findMany({
      where: {
        createdAt: {
          gte: pastTwoWeeks, // Filter products created after two weeks ago
        },
      },
      include: {
        category: true,
      },
    });

    return newReleases;
  } catch (error) {
    return [];
  }
}
