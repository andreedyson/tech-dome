import { z } from "zod";

const ALLOWED_FILE_TYPE = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg",
];

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid Email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be minimum of 8 characters" })
    .max(32, { message: "Password must be less than 32 characters" }),
});

export const registerSchema = loginSchema.extend({
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(2, { message: "Name must be minimum of 2 characters" })
    .max(80, { message: "Name must be less than 80 characters" }),
});

export const categorySchema = z.object({
  categoryId: z.coerce.number().optional(),
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
    .string({ required_error: "Brand Name is required" })
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

export const productSchema = z.object({
  name: z
    .string({ required_error: "Product Name is required" })
    .trim()
    .min(4, { message: "Product name must be minimum of 4 characters" }),
  price: z.coerce.number({ required_error: "Price is required" }),
  stock: z.coerce.number(),
  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .min(10, { message: "Description should be at least 10 characters" }),
  categoryId: z
    .string({ required_error: "Category is required" })
    .trim()
    .min(1, { message: "Category is required" }),
  brandId: z
    .string({ required_error: "Brand is required" })
    .trim()
    .min(1, { message: "Brand is required" }),
  locationId: z
    .string({ required_error: "Location is required" })
    .trim()
    .min(1, { message: "Location is required" }),
  status: z
    .string()
    .trim()
    .min(1, { message: "Status is required" })
    .pipe(
      z.enum(["PRE_ORDER", "READY"], {
        required_error: "Status is required",
      }),
    ),
  images: z
    .any()
    .refine((files: File[]) => files.length <= 3, {
      message: "Please upload maximum of 3 product images",
    })
    .refine(
      (files: File[]) => {
        let validate = false;

        Array.from(files).find((file) => {
          validate = ALLOWED_FILE_TYPE.includes(file.type);
        });

        return validate;
      },
      { message: "Uploaded files should be the type of images" },
    ),
});

export const editProductSchema = productSchema.omit({ images: true });

export const orderDetailsSchema = z.object({
  name: z
    .string({ required_error: " Name is required" })
    .trim()
    .min(3, { message: "Your Name must be minimum of 3 characters" }),
  phone: z
    .string({ required_error: "Phone Number is required" })
    .min(1, { message: "Phone Number is required" }),
  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(5, { message: "Address must be minimum of 5 characters" }),
  city: z
    .string({ required_error: "City is required" })
    .trim()
    .min(3, { message: "City must be minimum of 3 characters" }),
  postalCode: z
    .string({ required_error: "Postal Code is required" })
    .trim()
    .min(2, { message: "Postal Code must be minimum of 2 characters" }),
  notes: z.string().optional(),
});
