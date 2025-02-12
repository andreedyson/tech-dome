"use server";

import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LoginActionResult, RegisterActionResult } from "@/types/auth";
import { loginSchema, registerSchema } from "@/types/validations";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SignIn(
  _: unknown,
  formData: FormData,
): Promise<LoginActionResult> {
  try {
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
        role: "CUSTOMER",
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
  } catch (error) {
    return {
      errors: {
        email: undefined,
        password: undefined,
      },
      message: "Something went wrong when signing in",
    };
  }

  return redirect("/");
}

export async function SignUp(
  _: unknown,
  formData: FormData,
): Promise<RegisterActionResult> {
  try {
    const validatedFields = registerSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const userExist = await prisma.user.findUnique({
      where: {
        email: validatedFields.data.email,
      },
    });

    if (userExist) {
      return {
        errors: {
          name: undefined,
          email: undefined,
          password: undefined,
        },
        message: "User with that email already exists",
      };
    }

    const hashedPassword = bcrypt.hashSync(validatedFields.data.password, 12);

    await prisma.user.create({
      data: {
        email: validatedFields.data.email,
        name: validatedFields.data.name,
        password: hashedPassword,
        role: "CUSTOMER",
      },
    });
  } catch (error) {
    return {
      errors: {
        name: undefined,
        email: undefined,
        password: undefined,
      },
      message: "Something went wrong when signing up",
    };
  }

  return redirect("/sign-in");
}
