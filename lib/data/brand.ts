"use server";

import { Brand } from "@prisma/client";
import { prisma } from "../prisma";
import {
  AllBrandProps,
  BrandHighestSellingProductsProps,
  BrandSalesProps,
  BrandWithProductsProps,
  BrandWithTotalProductsProps,
} from "@/types/brand";
import { getImageUrl } from "../supabase";

export async function getAllBrands(): Promise<AllBrandProps[]> {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        id: "asc",
      },

      include: {
        Product: {
          include: {
            orders: true,
          },
        },
      },
    });

    const data = brands.map(({ Product, ...brand }) => ({
      ...brand,

      totalOrders:
        Product.find((product) => {
          return product.orders;
        })?.orders.length || 0,
    }));

    return data;
  } catch (error) {
    return [];
  }
}

export async function getPopularBrands(): Promise<Brand[]> {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        Product: {
          select: {
            orders: true,
          },
        },
      },
    });

    const filteredBrands = brands.filter((brand) => {
      const totalOrders = brand.Product.reduce((acc, product) => {
        return acc + product.orders.length;
      }, 0);

      return totalOrders >= 5;
    });

    return filteredBrands.slice(0, 4);
  } catch (error) {
    return [];
  }
}

export async function getBrandsWithTotalProducts(): Promise<
  BrandWithTotalProductsProps[]
> {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        Product: {
          select: {
            id: true,
          },
        },
      },
    });

    const mappedBrands = brands.map((brand) => ({
      id: brand.id,
      name: brand.name,
      logo: getImageUrl(brand.logo, "brands"),
      totalProducts: brand.Product.length,
    }));

    return mappedBrands.slice(0, 4);
  } catch (error) {
    return [];
  }
}

export async function getBrandsWithProducts(): Promise<
  BrandWithProductsProps[]
> {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        Product: {
          include: {
            category: true,
            location: true,
          },
        },
      },
    });

    const brandWithProducts = brands.map((brand) => ({
      id: brand.id,
      name: brand.name,
      logo: getImageUrl(brand.logo),
      products: brand.Product,
    }));

    return brandWithProducts.slice(0, 5);
  } catch (error) {
    return [];
  }
}

export async function getBrandSales(): Promise<BrandSalesProps[]> {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        Product: {
          include: {
            orders: true,
          },
        },
      },
    });

    const data = brands.map((brand) => {
      const totalOrders = brand.Product.reduce((acc, product) => {
        return acc + product.orders.length;
      }, 0);

      return {
        brand: brand.name,
        sales: totalOrders,
      };
    });

    return data;
  } catch (error) {
    return [];
  }
}

export async function getBrandHighestSellingProducts(): Promise<
  BrandHighestSellingProductsProps[]
> {
  try {
    const brands = await prisma.brand.findMany({
      where: {
        Product: {
          some: {
            orders: {
              some: {
                order: {
                  status: "SUCCESS",
                },
              },
            },
          },
        },
      },
      include: {
        Product: {
          include: {
            orders: true,
          },
        },
      },
    });

    const data = brands.map(({ Product, ...brand }) => ({
      ...brand,
      product: Product.find((product) => {
        return product.orders.length >= 5;
      }),
      totalOrders:
        Product.find((product) => {
          return product.orders.length >= 5;
        })?.orders.length || 0,
    }));

    return data;
  } catch (error) {
    return [];
  }
}
