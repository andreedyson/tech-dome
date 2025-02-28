import { ProductColumn } from "@/components/products/columns";
import { ProductDetailProps, TopProductProps } from "@/types/product";
import { prisma } from "../prisma";
import { getImageUrl } from "../supabase";
import { Product } from "@prisma/client";

export async function getAllProducts(): Promise<ProductColumn[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        brand: true,
        location: true,
        orders: true,
      },
    });

    const mappedProducts = products.map((product) => ({
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
    }));

    return mappedProducts;
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
      (product) => product.orders.length >= 5,
    );

    const data = topProducts.map(({ orders, ...product }) => ({
      ...product,
      totalOrders: orders.length,
    }));

    return data.slice(0, 4);
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
    });

    const data = newReleases.map(({ orders, ...product }) => ({
      ...product,
      totalOrders: orders.length,
    }));

    return data.slice(0, 8);
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
      include: { category: true },
    });

    return similarProducts;
  } catch (error) {
    return [];
  }
}
