"use server";

import { validateProtected } from "@/lib/check-session";
import { CartProps } from "@/types/product";
import { orderDetailsSchmea } from "@/types/validations";
import { revalidatePath } from "next/cache";

export async function createOrderDetails(
  _: unknown,
  formData: FormData,
  products: CartProps[],
  total: number,
) {
  try {
    const user = await validateProtected();
    if (!user) {
      return {
        error: "You must be signed in to perform this action",
        message: undefined,
      };
    }

    const data = {
      name: formData.get("name"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      city: formData.get("city"),
      postalCode: formData.get("postalCode"),
      notes: formData.get("notes"),
    };

    const validatedFields = orderDetailsSchmea.safeParse(data);

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    revalidatePath("/dashboard/cart");

    return {
      error: undefined,
      message: "Order successfully created",
    };
  } catch (error) {
    return {
      error: "Something went wrong creating Order",
      message: undefined,
    };
  }
}
