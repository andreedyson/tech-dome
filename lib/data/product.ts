"use server";

import { ProductColumn } from "@/components/products/columns";
import {
  LowStockProductProps,
  ProductDetailProps,
  TopProductProps,
} from "@/types/product";
import { prisma } from "../prisma";
import { getImageUrl } from "../supabase";

export async function getAllProducts(
  sortBy: "id" | "name" = "id",
): Promise<ProductColumn[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        brand: true,
        location: true,
        orders: true,
      },
      orderBy: {
        [sortBy]: "asc",
      },
    });

    const data = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: getImageUrl(product.images[0], "products"),
      categoryName: product.category.name,
      brandName: product.brand.name,
      locationName: product.location.name,
      total_sales: product.orders.length,
      status: product.status,
      createdAt: product.createdAt,
      stock: product.stock,
    }));

    return data;
  } catch (error) {
    return [];
  }
}

export async function getProductById(
  productId: string,
): Promise<ProductDetailProps | null> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,
        brand: true,
        location: true,
        orders: true,
      },
    });

    if (!product) {
      return null;
    }

    const data = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      images: product.images,
      category: product.category,
      brand: product.brand,
      location: product.location,
      total_sales: product.orders.length,
      status: product.status,
      createdAt: product.createdAt,
    };

    return data;
  } catch (error) {
    return null;
  }
}

export async function getTopProducts(): Promise<TopProductProps[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        orders: true,
        category: true,
        location: true,
      },
    });

    const topProducts = products.filter(
      (product) => product.orders.length >= 1,
    );

    const data = topProducts
      .map(({ orders, ...product }) => ({
        ...product,
        totalOrders: orders.length,
      }))
      .sort((a, b) => b.totalOrders - a.totalOrders);

    return data;
  } catch (error) {
    return [];
  }
}

export async function getNewReleaseProducts(): Promise<TopProductProps[]> {
  try {
    const currentDate = new Date();

    // Calculate the date two weeks ago
    const pastTwoWeeks = new Date(currentDate);
    pastTwoWeeks.setDate(currentDate.getDate() - 14);

    const newReleases = await prisma.product.findMany({
      where: {
        createdAt: {
          gte: pastTwoWeeks, // Filter products created after two weeks ago
        },
      },
      include: {
        orders: true,
        category: true,
        location: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const data = newReleases.map(({ orders, ...product }) => ({
      ...product,
      totalOrders: orders.length,
    }));

    return data;
  } catch (error) {
    return [];
  }
}

export async function getSimilarProducts(
  categoryId: number,
): Promise<ProductDetailProps[]> {
  try {
    const similarProducts = await prisma.product.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        category: true,
        brand: true,
        location: true,
        orders: true,
      },
    });

    if (!similarProducts) {
      return [];
    }

    const data = similarProducts.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      images: product.images,
      category: product.category,
      brand: product.brand,
      location: product.location,
      total_sales: product.orders.length,
      status: product.status,
      createdAt: product.createdAt,
    }));

    return data;
  } catch (error) {
    return [];
  }
}

export async function getLowStocksProducts(): Promise<LowStockProductProps[]> {
  try {
    const products = await prisma.product.findMany({});

    const data = products
      .filter((product) => {
        return product.stock <= 5;
      })
      .map((product) => ({
        product: product.name,
        stock: product.stock,
      }));

    return data.sort((a, b) => a.stock - b.stock);
  } catch (error) {
    return [];
  }
}
