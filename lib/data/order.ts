import { OrderColumn } from "@/components/orders/columns";
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

    const mappedOrders = orders.map((order) => ({
      id: order.id,
      products: order.products.map((item) => ({
        name: item.product.name,
        image: getImageUrl(item.product.images[0]),
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
