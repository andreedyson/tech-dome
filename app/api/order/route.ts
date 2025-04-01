import { NextRequest, NextResponse } from "next/server";
import { validateProtected } from "@/lib/check-session";
import { prisma } from "@/lib/prisma";
import { generateRandomString } from "@/lib/utils";
import { orderDetailsSchema } from "@/types/validations";
import { Prisma } from "@prisma/client";
import { CartProps } from "@/types/product";

export const runtime = "nodejs"; // Allow longer execution
export const maxDuration = 20;

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateProtected();
    if (!user) {
      return NextResponse.json(
        { error: "You must be signed in to perform this action" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { formDataObject, products, total } = body as {
      formDataObject: {
        name: string;
        address: string;
        phone: string;
        city: string;
        postalCode: string;
        notes?: string;
      };
      products: CartProps[];
      total: number;
    };

    const validatedFields = orderDetailsSchema.safeParse(formDataObject);
    if (!validatedFields.success) {
      return NextResponse.json(
        { error: validatedFields.error.errors[0].message },
        { status: 400 },
      );
    }

    for (const product of products) {
      const productInStock = await prisma.product.findUnique({
        where: { id: product.id },
        select: { name: true, stock: true },
      });

      if (!productInStock || productInStock.stock < product.quantity) {
        return NextResponse.json(
          {
            error: `You can only buy a maximum of ${productInStock?.stock} items for ${productInStock?.name}.`,
          },
          { status: 400 },
        );
      }
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: total,
        status: "PENDING",
        code: generateRandomString(),
      },
    });

    await prisma.order.update({
      where: { code: order.code },
      data: { status: "SUCCESS" },
    });

    const orderProducts: Prisma.OrderProductCreateManyInput[] = [];

    for (const product of products) {
      orderProducts.push({
        orderId: order.id,
        productId: product.id,
        subTotal: product.price,
        quantity: product.quantity,
      });

      await prisma.product.update({
        where: { id: product.id },
        data: {
          stock: { decrement: product.quantity },
        },
      });
    }

    await prisma.orderProduct.createMany({
      data: orderProducts,
    });

    await prisma.orderDetails.create({
      data: {
        ...validatedFields.data,
        orderId: order.id,
      },
    });

    return NextResponse.json({
      message: "Order created successfully!",
      redirectUrl: "/",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong creating Order. Try again!" },
      { status: 500 },
    );
  }
}
