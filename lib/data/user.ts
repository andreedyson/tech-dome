import { CustomerColumn } from "@/components/customers/columns";
import { prisma } from "../prisma";

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
