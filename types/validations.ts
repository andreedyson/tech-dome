import { z } from "zod";

const ALLOWED_FILE_TYPE = ["image/jpg", "image/jpeg", "image/png"];

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid Email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be minimum of 8 characters" })
    .max(32, { message: "Password must be less than 32 characters" }),
});

export const categorySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, { message: "Category name must be minimum of 2 characters" })
    .max(32, { message: "Category name must be less than 32 characters" }),
});

export const locationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, { message: "Location name must be minimum of 2 characters" })
    .max(32, { message: "Location name must be less than 32 characters" }),
});

export const brandSchema = z.object({
  name: z
    .string({ required_error: "brand Name is required" })
    .trim()
    .min(2, { message: "Brand name must be minimum of 2 characters" })
    .max(32, { message: "Brand name must be less than 32 characters" }),
  logo: z
    .any()
    .refine((file: File) => file.name, { message: "Image is required" })
    .refine((file: File) => ALLOWED_FILE_TYPE.includes(file.type), {
      message: "File type is not allowed",
    }),
});
