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
