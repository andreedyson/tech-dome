import { Category } from "@prisma/client";
import { prisma } from "../prisma";

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
