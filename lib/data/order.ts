"use server";

import { OrderColumn } from "@/components/orders/columns";
import { LatestOrderColumn } from "@/components/orders/latest-order-columns";
import { UserOrderHistoryProps } from "@/types/order";
import { prisma } from "../prisma";
import { getImageUrl } from "../supabase";

export async function getAllOrders(): Promise<OrderColumn[]> {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    const data = orders.map((order) => ({
      id: order.id.toString(),
      products: order.products.map((item) => ({
        name: item.product.name,
        image: getImageUrl(item.product.images[0], "products"),
      })),
      createdAt: order.createdAt,
      customerName: order.user.name,
      total: Number(order.total),
      status: order.status,
    }));

    return data;
  } catch (error) {
    return [];
  }
}

export async function getUserOrderHistory(
  userId: string,
): Promise<UserOrderHistoryProps[]> {
  try {
    const userOrders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        products: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const data = userOrders.map((order) => ({
      id: order.code,
      status: order.status,
      total: order.total,
      updatedAt: order.updatedAt,
      products: order.products.map((item) => ({
        name: item.product.name,
        image: item.product.images[0],
        quantity: item.quantity,
        price: item.subTotal,
        category: item.product.category.name,
      })),
    }));

    return data;
  } catch (error) {
    return [];
  }
}

export async function getLatestOrders(): Promise<LatestOrderColumn[]> {
  try {
    const currentDate = new Date();

    // Calculate the date for the past week
    const pastTwoWeeks = new Date(currentDate);
    pastTwoWeeks.setDate(currentDate.getDate() - 14);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: pastTwoWeeks,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        products: {
          include: {
            product: true,
          },
        },
        detail: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const data = orders.map((order) => ({
      id: order.id.toString(),
      products: order.products.map((item) => ({
        name: item.product.name,
        image: getImageUrl(item.product.images[0], "products"),
      })),
      customerName: order.detail?.name || "",
      total: Number(order.total),
      status: order.status,
      createdAt: order.createdAt,
    }));

    return data;
  } catch (error) {
    return [];
  }
}
