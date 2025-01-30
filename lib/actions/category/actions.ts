"use server";

import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types/auth";
import { categorySchema } from "@/types/validations";
import { Category } from "@prisma/client";
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

export async function editCategory(
  categoryData: Category,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryData.id,
      },
    });

    if (!category) {
      return {
        error: "Category not found",
        message: undefined,
      };
    }

    const name = formData.get("name");

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

    if (validatedFields.data.name === categoryData.name || categoryExist) {
      return {
        error: "Category name already exist",
        message: undefined,
      };
    }

    await prisma.category.update({
      where: {
        id: categoryData.id,
      },
      data: {
        name: validatedFields.data.name,
      },
    });

    return {
      error: undefined,
      message: "Category successfully edited",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
      message: undefined,
    };
  }
}
