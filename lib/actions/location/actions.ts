"use server";

import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types/auth";
import { locationSchema } from "@/types/validations";
import { Location } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createLocation(
  userId: string,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const name = formData.get("name");
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return {
        error: "User not found",
        message: undefined,
      };
    }

    const validatedFields = locationSchema.safeParse({
      name: name,
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    const locationExist = await prisma.location.findFirst({
      where: {
        name: validatedFields.data.name,
      },
    });

    if (locationExist) {
      return {
        error: "Location name already exist",
        message: undefined,
      };
    }

    await prisma.location.create({
      data: {
        name: validatedFields.data.name,
      },
    });

    revalidatePath("/dashboard/locations");

    return {
      error: undefined,
      message: "Location successfully created",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
      message: undefined,
    };
  }
}

export async function editlocation(
  locationData: Location,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const location = await prisma.location.findUnique({
      where: {
        id: locationData.id,
      },
    });

    if (!location) {
      return {
        error: "location not found",
        message: undefined,
      };
    }

    const name = formData.get("name");

    const validatedFields = locationSchema.safeParse({
      name: name,
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    const locationExist = await prisma.location.findFirst({
      where: {
        name: validatedFields.data.name,
      },
    });

    if (validatedFields.data.name === locationData.name || locationExist) {
      return {
        error: "Location name already exist",
        message: undefined,
      };
    }

    await prisma.location.update({
      where: {
        id: locationData.id,
      },
      data: {
        name: validatedFields.data.name,
      },
    });

    revalidatePath("/dashboard/locations");

    return {
      error: undefined,
      message: "Location successfully edited",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
      message: undefined,
    };
  }
}

export async function deletelocation(
  locationId: number,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const location = await prisma.location.findUnique({
      where: {
        id: locationId,
      },
    });

    if (!location) {
      return {
        error: "Location not found",
        message: undefined,
      };
    }

    await prisma.location.delete({
      where: {
        id: locationId,
      },
    });

    return {
      error: undefined,
      message: "Location successfully deleted",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
      message: undefined,
    };
  }
}
