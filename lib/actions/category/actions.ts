"use server";

import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types/auth";
import { categorySchema } from "@/types/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategory(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const validatedFields = categorySchema.safeParse({
      name: formData.get("name"),
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
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
