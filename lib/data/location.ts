"use server";

import { SalesByLocationProps } from "@/types/location";
import { prisma } from "../prisma";
import { Location } from "@prisma/client";

export async function getAllLocations(
  sortBy: "id" | "name" = "id",
): Promise<Location[]> {
  try {
    const locations = await prisma.location.findMany({
      orderBy: {
        [sortBy]: "asc",
      },
    });

    return locations;
  } catch (error) {
    return [];
  }
}

export async function getSalesByLocation(): Promise<SalesByLocationProps[]> {
  try {
    const locations = await prisma.location.findMany({
      include: {
        Product: {
          include: {
            orders: true,
          },
        },
      },
    });

    const data = locations
      .map((location) => ({
        id: location.id,
        name: location.name,
        totalSales: location.Product.reduce(
          (acc, curr) => acc + curr.orders.length,
          0,
        ),
      }))
      .sort((a, b) => b.totalSales - a.totalSales);

    return data.slice(0, 4);
  } catch (error) {
    return [];
  }
}
