"use server";

import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types/auth";
import { brandSchema } from "@/types/validations";
import { revalidatePath } from "next/cache";

export async function createBrand(
  userId: string,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const name = formData.get("name");
    const logo = formData.get("logo");

    console.log(name);

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

    const validatedFields = brandSchema.safeParse({
      name: name,
      logo: logo,
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    const brandExist = await prisma.brand.findFirst({
      where: {
        name: validatedFields.data.name,
      },
    });

    if (brandExist) {
      return {
        error: "Brand name already exist",
        message: undefined,
      };
    }

    const fileName = await uploadFile(validatedFields.data.logo, "brands");

    await prisma.brand.create({
      data: {
        name: validatedFields.data.name,
        logo: fileName,
      },
    });

    revalidatePath("/dashboard/brands");

    return {
      error: undefined,
      message: "Brand successfully created",
    };
  } catch (error) {
    return {
      error: "Something went wrong creating Brand",
      message: undefined,
    };
  }
}
