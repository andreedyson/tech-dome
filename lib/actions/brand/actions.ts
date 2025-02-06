"use server";

import { validateProtected } from "@/lib/check-session";
import { prisma } from "@/lib/prisma";
import { deleteFile, updateFile, uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types/auth";
import { brandSchema } from "@/types/validations";
import { Brand } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createBrand(
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
    const logo = formData.get("logo");

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

export async function editBrand(
  brandData: Brand,
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
    const name = formData.get("name");
    const logo = formData.get("logo");

    const fileUpload = logo as File;

    const validatedFields = brandSchema.pick({ name: true }).safeParse({
      name: name,
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    const brand = await prisma.brand.findUnique({
      where: {
        id: brandData.id,
      },
      select: {
        name: true,
        logo: true,
      },
    });

    if (!brand) {
      return {
        error: "Brand not found",
        message: undefined,
      };
    }

    // Check if the brand name is being changed
    if (validatedFields.data.name !== brand.name) {
      const brandNameExist = await prisma.brand.findFirst({
        where: {
          name: validatedFields.data.name,
        },
      });

      if (brandNameExist) {
        return {
          error: "Brand name already exists",
          message: undefined,
        };
      }
    }

    let prevFile = new File([], brand.logo);
    let newFilename = brand.logo;

    if (fileUpload.size > 0) {
      newFilename = await updateFile(prevFile, fileUpload, "brands");
    }

    // Update the brand with the new name and logo if provided
    await prisma.brand.update({
      where: {
        id: brandData.id,
      },
      data: {
        name: validatedFields.data.name,
        logo: newFilename,
      },
    });

    revalidatePath("/dashboard/brands");

    return {
      error: undefined,
      message: "Brand successfully edited",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
      message: undefined,
    };
  }
}

export async function deleteBrand(
  brandId: number,
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

    const brand = await prisma.brand.findUnique({
      where: {
        id: brandId,
      },
    });

    if (!brand) {
      return {
        error: "Brand not found",
        message: undefined,
      };
    }

    await deleteFile(brand.logo, "brands");

    await prisma.brand.delete({
      where: {
        id: brandId,
      },
    });

    revalidatePath("/dashboard/brands");

    return {
      error: undefined,
      message: "Brand successfully deleted",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
      message: undefined,
    };
  }
}
