"use server";

import { validateProtected } from "@/lib/check-session";
import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types/auth";
import { categorySchema } from "@/types/validations";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createCategory(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const user = await validateProtected();
    if (!user) {
      return {
        error: "You must be signed in to perform this action",
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
  const user = await validateProtected();
  if (!user) {
    return {
      error: "You must be signed in to perform this action",
      message: undefined,
    };
  }

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

    revalidatePath("/dashboard/categories");

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

export async function deleteCategory(
  categoryId: number,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const user = await validateProtected();
    if (!user) {
      return {
        error: "You must be signed in to perform this action",
        message: undefined,
      };
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return {
        error: "Category not found",
        message: undefined,
      };
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    revalidatePath("/dashboard/categories");

    return {
      error: undefined,
      message: "Category successfully deleted",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
      message: undefined,
    };
  }
}
