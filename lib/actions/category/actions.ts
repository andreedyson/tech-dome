"use server";

import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types/auth";
import { categorySchema } from "@/types/validations";
import { revalidatePath } from "next/cache";

export async function createCategory(
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

    const validatedFields = categorySchema.safeParse({
      name: name,
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    const categoryExist = await prisma.category.findFirst({
      where: {
        name: validatedFields.data.name,
      },
    });

    if (categoryExist) {
      return {
        error: "Category name already exist",
        message: undefined,
      };
    }

    await prisma.category.create({
      data: {
        name: validatedFields.data.name,
      },
    });

    revalidatePath("/dashboard/categories");

    return {
      error: undefined,
      message: "Category successfully created",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
      message: undefined,
    };
  }
}
