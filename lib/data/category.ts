"use server";

import { Category } from "@prisma/client";
import { prisma } from "../prisma";
import {
  CategoryWithProductsProps,
  TotalProductByCategoryProps,
} from "@/types/category";

export async function getAllCategories(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return categories;
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
