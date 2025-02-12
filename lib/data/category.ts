"use server";

import { Category } from "@prisma/client";
import { prisma } from "../prisma";
import { TotalProductByCategoryProps } from "@/types/category";

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
      select: {
        name: true,
        Product: {
          select: {
            id: true,
          },
        },
      },
    });

    const data = categories.map((category) => ({
      name: category.name,
      totalProducts: category.Product.length,
    }));

    return data;
  } catch (error) {
    return [];
  }
}
