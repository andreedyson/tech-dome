import { CustomerColumn } from "@/components/customers/columns";
import { prisma } from "../prisma";
import { TopCustomersProps } from "@/types/user";

export async function getAllCustomers(): Promise<CustomerColumn[]> {
  try {
    const customers = await prisma.user.findMany({
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

    return customers;
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

    const data = topCustomers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      totalOrders: customer.Order.length,
    }));

    return data;
  } catch (error) {
    return [];
  }
}
