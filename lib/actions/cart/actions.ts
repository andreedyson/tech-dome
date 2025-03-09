"use server";

import { validateProtected } from "@/lib/check-session";
import { prisma } from "@/lib/prisma";
import { generateRandomString } from "@/lib/utils";
import xenditClient from "@/lib/xendit";
import { CartProps } from "@/types/product";
import { orderDetailsSchema } from "@/types/validations";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  PaymentRequest,
  PaymentRequestParameters,
} from "xendit-node/payment_request/models";

export async function createOrderDetails(
  _: unknown,
  formData: FormData,
  products: CartProps[],
  total: number,
) {
  let redirectPaymentUrl = "/payment-success";

  try {
    const { user } = await validateProtected();
    if (!user) {
      return {
        error: "You must be signed in to perform this action",
        message: undefined,
      };
    }

    const formDataObject = {
      name: formData.get("name"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      city: formData.get("city"),
      postalCode: formData.get("postalCode"),
      notes: formData.get("notes"),
    };

    const validatedFields = orderDetailsSchema.safeParse(formDataObject);

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    // Check product stock before creating the order
    for (const product of products) {
      const productInStock = await prisma.product.findUnique({
        where: { id: product.id },
        select: { name: true, stock: true },
      });

      if (!productInStock || productInStock.stock < product.quantity) {
        return {
          error: `You can only buy a maximum of ${productInStock?.stock} items for ${productInStock?.name}.`,
        };
      }
    }

    // Order Data
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: total,
        status: "PENDING",
        code: generateRandomString(),
      },
    });

    // Xendit Payment Data
    const data: PaymentRequestParameters = {
      currency: "IDR",
      amount: total,
      referenceId: order.code,
      paymentMethod: {
        ewallet: {
          channelProperties: {
            successReturnUrl: process.env.NEXT_PUBLIC_REDIRECT_URL as string,
          },
          channelCode: "SHOPEEPAY",
        },
        reusability: "ONE_TIME_USE",
        type: "EWALLET",
      },
    };

    const response: PaymentRequest =
      await xenditClient.PaymentRequest.createPaymentRequest({
        data,
      });

    redirectPaymentUrl =
      response.actions?.find((res) => res.urlType == "DEEPLINK")?.url ?? "";

    const queryProductOrder: Prisma.OrderProductCreateManyInput[] = [];

    for (const product of products) {
      queryProductOrder.push({
        orderId: order.id,
        productId: product.id,
        subTotal: product.price,
        quantity: product.quantity,
      });

      await prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            decrement: product.quantity,
          },
        },
      });
    }

    await prisma.orderProduct.createMany({
      data: queryProductOrder,
    });

    await prisma.orderDetails.create({
      data: {
        name: validatedFields.data.name,
        address: validatedFields.data.address,
        city: validatedFields.data.city,
        phone: validatedFields.data.phone,
        postalCode: validatedFields.data.postalCode,
        notes: validatedFields.data.notes,
        orderId: order.id,
      },
    });
  } catch (error) {
    return {
      error: "Something went wrong creating Order",
      message: undefined,
    };
  }

  redirect(redirectPaymentUrl);
}
