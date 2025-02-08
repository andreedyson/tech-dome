"use server";

import { Location } from "@prisma/client";
import { prisma } from "../prisma";

export async function getAllLocations(): Promise<Location[]> {
  try {
    const locations = await prisma.location.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return locations;
  } catch (error) {
    return [];
  }
}
