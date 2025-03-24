"use server";

import {
  AllCategoryProps,
  CategoryWithProductsProps,
  TotalProductByCategoryProps,
} from "@/types/category";
import { prisma } from "../prisma";

export async function getAllCategories(
  sortBy: "id" | "name" = "id",
): Promise<AllCategoryProps[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        [sortBy]: "asc",
      },
      include: {
        Product: true,
      },
    });

    const data = categories.map(({ Product, ...category }) => ({
      ...category,
      totalProducts: Product.length,
    }));

    return data;
  } catch (error) {
    return [];
  }
}

export async function getTotalProductsByCategory(): Promise<
  TotalProductByCategoryProps[]
> {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            Product: true,
          },
        },
      },
    });

    const data = categories.map(({ _count, ...category }) => ({
      ...category,
      totalProducts: _count.Product,
    }));

    return data.slice(0, 8);
  } catch (error) {
    return [];
  }
}

export async function getCategoryWithProducts(): Promise<
  CategoryWithProductsProps[]
> {
  try {
    const categories = await prisma.category.findMany({
      include: {
        Product: {
          include: {
            category: true,
            location: true,
            brand: true,
          },
        },
      },
    });

    const categoryWithProducts = categories.map((category) => ({
      id: category.id,
      name: category.name,
      products: category.Product,
    }));

    return categoryWithProducts;
  } catch (error) {
    return [];
  }
}
