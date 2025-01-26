import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid Email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be minimum of 8 characters" })
    .max(32, { message: "Password must be less than 32 characters" }),
});
