"use server";

import { ActionResult } from "@/types/auth";
import { loginSchema } from "@/types/validations";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export async function SignIn(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    const { errors } = validatedFields.error;
    return {
      error: errors[0].message,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: validatedFields.data.email,
    },
  });

  return redirect("/sign-in");
}
