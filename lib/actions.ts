"use server";

import { ActionResult } from "@/types/auth";
import { loginSchema } from "@/types/validations";
import { redirect } from "next/navigation";

export async function SignIn(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  console.log(formData.get("email"));

  // const validatedFields = loginSchema.safeParse({
  //   email: formData.get("email"),
  //   password: formData.get("password"),
  // });

  // Return early if the form data is invalid
  // if (!validatedFields.success) {
  //   const { errors } = validatedFields.error;
  //   return {
  //     error: errors[0].message,
  //   };
  // }

  return redirect("/sign-in");
}
