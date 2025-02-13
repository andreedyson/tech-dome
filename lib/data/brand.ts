"use server";

import { Brand } from "@prisma/client";
import { prisma } from "../prisma";

export async function getAllBrands(): Promise<Brand[]> {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return brands;
  } catch (error) {
    return [];
  }
}

export async function getPopularBrands(): Promise<Brand[]> {
  try {
    // TODO: Filter Brands with the total orders of 10 or more
    const brands = await prisma.brand.findMany({
      include: {
        Product: {
          include: {
            orders: true,
          },
        },
      },
    });

    return brands;
  } catch (error) {
    return [];
  }
}
