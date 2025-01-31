import { prisma } from "../prisma";

export async function getAllCategories() {
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
