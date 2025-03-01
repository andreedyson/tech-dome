import { Filter } from "@/hooks/use-filter-catalog";
import { prisma } from "@/lib/prisma";
import { ProductDetailProps } from "@/types/product";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const res = (await req.json()) as Filter;

    const ORQuery: Prisma.ProductWhereInput[] = [];

    if (res.search && res.search !== "") {
      ORQuery.push({
        name: {
          contains: res.search,
          mode: "insensitive",
        },
      });
    }

    if (res.minPrice && res.minPrice > 0) {
      ORQuery.push({
        price: {
          gte: res.minPrice,
        },
      });
    }

    if (res.maxPrice && res.maxPrice > 0) {
      ORQuery.push({
        price: {
          lte: res.maxPrice,
        },
      });
    }

    if (res.status && res.status.length > 0) {
      ORQuery.push({
        status: {
          in: res.status,
        },
      });
    }

    if (res.brands && res.brands.length > 0) {
      ORQuery.push({
        brand: {
          id: {
            in: res.brands,
          },
        },
      });
    }

    if (res.categories && res.categories.length > 0) {
      ORQuery.push({
        category: {
          id: {
            in: res.categories,
          },
        },
      });
    }

    if (res.locations && res.locations.length > 0) {
      ORQuery.push({
        location: {
          id: {
            in: res.locations,
          },
        },
      });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: ORQuery.length > 0 ? ORQuery : undefined,
      },
      select: {
        id: true,
        images: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        status: true,
        createdAt: true,
        category: true,
        brand: true,
        location: true,
        orders: {
          select: {
            id: true,
          },
        },
      },
    });

    const response: ProductDetailProps[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      category: product.category,
      brand: product.brand,
      location: product.location,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      status: product.status,
      total_sales: product.orders.length,
    }));

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
