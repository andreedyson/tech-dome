"use server";

import { validateProtected } from "@/lib/check-session";
import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types/auth";
import { editProductSchema, productSchema } from "@/types/validations";
import { Product, ProductStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
      images: formData.getAll("image"),
    };

    const validatedFields = productSchema.safeParse(formDatas);

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    const uploadedImages = validatedFields.data.images as File[];
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

    revalidatePath("/dashboard/products");

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

export async function editProduct(
  productData: Product,
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
    };

    const validatedFields = editProductSchema.safeParse(formDatas);

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productData.id,
      },
    });

    if (!product) {
      return {
        error: "Product not found",
        message: undefined,
      };
    }

    // Check if the product name is being changed
    if (validatedFields.data.name !== product.name) {
      const productNameExist = await prisma.product.findFirst({
        where: {
          name: validatedFields.data.name,
        },
      });

      if (productNameExist) {
        return {
          error: "Product name already exists",
          message: undefined,
        };
      }
    }

    const uploadedImages = formData.getAll("images") as File[];
    let filenames = [];

    if (uploadedImages.length === 3) {
      const parseImage = productSchema.pick({ images: true }).safeParse({
        images: uploadedImages,
      });

      if (!parseImage.success) {
        return {
          error: "Failed to upload image",
          message: undefined,
        };
      }

      for (const images of uploadedImages) {
        const filename = await uploadFile(images, "products");
        filenames.push(filename);
      }
    } else {
      filenames = product.images;
    }

    await prisma.product.update({
      where: {
        id: productData.id,
      },
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

    revalidatePath("/dashboard/products");

    return {
      error: undefined,
      message: "Product edited successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
      message: undefined,
    };
  }
}
