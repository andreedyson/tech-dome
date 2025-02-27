import { StatsCardProps } from "@/types/dashboard";
import { prisma } from "../prisma";
import { Building, Package, ReceiptText, TicketCheck } from "lucide-react";

export async function getStatsCardData(): Promise<StatsCardProps[]> {
  try {
    const products = await prisma.product.findMany({});
    const brands = await prisma.brand.findMany({});
    const pendingOrders = await prisma.order.findMany({
      where: {
        status: "PENDING",
      },
    });
    const sucessOrders = await prisma.order.findMany({
      where: {
        status: "SUCCESS",
      },
    });

    const data = [
      { name: "Products", total: products.length, icon: Package },
      { name: "Brands", total: brands.length, icon: Building },
      {
        name: "Pending Orders",
        total: pendingOrders.length,
        icon: ReceiptText,
      },
      { name: "Success Orders", total: sucessOrders.length, icon: TicketCheck },
    ];

    return data;
  } catch (error) {
    return [];
  }
}
