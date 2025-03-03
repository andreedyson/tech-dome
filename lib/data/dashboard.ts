import { StatsCardProps } from "@/types/dashboard";
import { prisma } from "../prisma";
import { Building, Package, ReceiptText, TicketCheck } from "lucide-react";

export async function getStatsCardData(): Promise<StatsCardProps[]> {
  try {
    const [products, brands, pendingOrders, successOrders] = await Promise.all([
      prisma.product.findMany({}),
      prisma.brand.findMany({}),
      prisma.order.findMany({ where: { status: "PENDING" } }),
      prisma.order.findMany({ where: { status: "SUCCESS" } }),
    ]);

    const data = [
      { name: "Products", total: products.length, icon: Package },
      { name: "Brands", total: brands.length, icon: Building },
      {
        name: "Pending Orders",
        total: pendingOrders.length,
        icon: ReceiptText,
      },
      {
        name: "Success Orders",
        total: successOrders.length,
        icon: TicketCheck,
      },
    ];

    return data;
  } catch (error) {
    return [];
  }
}
