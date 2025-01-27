"use server";

import { LoginActionResult, LogoutActionResult } from "@/types/auth";
import { loginSchema } from "@/types/validations";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import { getUser, lucia } from "./auth";
import { cookies } from "next/headers";

export async function SignIn(
  _: unknown,
  formData: FormData,
): Promise<LoginActionResult> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Return early if the form data is invalid
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
): Promise<LogoutActionResult> {
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

  return redirect("/sign-in");
}
