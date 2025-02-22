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
    const brands = await prisma.brand.findMany({
      include: {
        Product: {
          select: {
            orders: true,
          },
        },
      },
    });

    const filteredBrands = brands.filter((brand) => {
      const totalOrders = brand.Product.reduce((acc, product) => {
        return acc + product.orders.length;
      }, 0);

      return totalOrders >= 5;
    });

    return filteredBrands.slice(0, 4);
  } catch (error) {
    return [];
  }
}
