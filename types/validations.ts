import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(8, { message: "Password must be minimum of 8 characters" })
    .max(32, { message: "Password must be less than 32 characters" }),
});
