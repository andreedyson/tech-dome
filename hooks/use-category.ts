"use client";

import { getAllCategories } from "@/lib/data/category";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const { data, isLoading, isError, error } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  return { data, isLoading, isError, error };
}
