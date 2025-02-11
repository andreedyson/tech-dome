"use server";

import { LoginActionResult, ActionResult } from "@/types/auth";
import { loginSchema } from "@/types/validations";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { getUser, lucia } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function SignIn(
  _: unknown,
  formData: FormData,
): Promise<LoginActionResult> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: validatedFields.data.email,
      role: "ADMIN",
    },
  });

  if (!existingUser) {
    return {
      errors: {
        email: undefined,
        password: undefined,
      },
      message: "User not found",
    };
  }

  const comparePassword = bcrypt.compareSync(
    validatedFields.data.password,
    existingUser.password,
  );

  if (!comparePassword) {
    return {
      errors: {
        email: undefined,
        password: undefined,
      },
      message: "Invalid credentials provided",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/dashboard");
}

export async function SignOut(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const { session } = await getUser();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/sign-in");
}
