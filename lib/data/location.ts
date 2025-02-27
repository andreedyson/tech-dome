import { SalesByCountryProps } from "@/types/location";
import { prisma } from "../prisma";

export async function getSalesByCountry(): Promise<SalesByCountryProps[]> {
  try {
    const locations = await prisma.location.findMany({
      include: {
        Product: {
          include: {
            orders: true,
          },
        },
      },
    });

    const data = locations.map((location) => ({
      id: location.id,
      name: location.name,
      totalSales: location.Product.reduce(
        (acc, curr) => acc + curr.orders.length,
        0,
      ),
    }));

    return data.slice(0, 4);
  } catch (error) {
    return [];
  }
}
