"use server";

import { CustomerColumn } from "@/components/customers/columns";
import { TopCustomersProps } from "@/types/user";
import { prisma } from "../prisma";

export async function getAllCustomers(): Promise<CustomerColumn[]> {
  try {
    const data = await prisma.user.findMany({
      where: {
        role: "CUSTOMER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return data;
  } catch (error) {
    return [];
  }
}

export async function getTopCustomers(): Promise<TopCustomersProps[]> {
  try {
    const topCustomers = await prisma.user.findMany({
      where: {
        role: "CUSTOMER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        Order: {
          where: {
            status: "SUCCESS",
          },
        },
      },
    });

    const data = topCustomers
      .map((customer) => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        totalOrders: customer.Order.length,
      }))
      .filter((customer) => {
        return customer.totalOrders >= 1;
      });

    return data;
  } catch (error) {
    return [];
  }
}
