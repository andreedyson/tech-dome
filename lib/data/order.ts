import { OrderColumn } from "@/components/orders/columns";
import { prisma } from "../prisma";
import { getImageUrl } from "../supabase";
import { UserOrderHistoryProps } from "@/types/order";

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

    const mappedOrders = orders.map((order) => ({
      id: order.id,
      products: order.products.map((item) => ({
        name: item.product.name,
        image: getImageUrl(item.product.images[0], "products"),
      })),
      createdAt: order.createdAt,
      customerName: order.user.name,
      total: Number(order.total),
      status: order.status,
    }));

    return mappedOrders;
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

    const mappedUserOrders = userOrders.map((order) => ({
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

    return mappedUserOrders;
  } catch (error) {
    return [];
  }
}
