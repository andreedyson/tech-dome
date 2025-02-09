"use server";

import { validateProtected } from "@/lib/check-session";
import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types/auth";
import { productSchema } from "@/types/validations";
import { ProductStatus } from "@prisma/client";

export async function createProduct(
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

    const formDatas = {
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),
      categoryId: formData.get("categoryId"),
      locationId: formData.get("locationId"),
      brandId: formData.get("brandId"),
      status: formData.get("status"),
      image: formData.getAll("image"),
    };

    const validatedFields = productSchema.safeParse(formDatas);

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    const uploadedImages = validatedFields.data.image as File[];
    const filenames = [];

    for (const images of uploadedImages) {
      const filename = await uploadFile(images, "products");
      filenames.push(filename);
    }

    await prisma.product.create({
      data: {
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        price: Number(validatedFields.data.price),
        categoryId: Number(validatedFields.data.categoryId),
        brandId: Number(validatedFields.data.brandId),
        locationId: Number(validatedFields.data.locationId),
        status: validatedFields.data.status as ProductStatus,
        images: filenames,
      },
    });

    return {
      error: undefined,
      message: "Product successfully created",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
      message: undefined,
    };
  }
}
