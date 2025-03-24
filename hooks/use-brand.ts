"use client";

import { getAllBrands } from "@/lib/data/brand";
import { Brand } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useBrands() {
  const { data, isLoading, isError, error } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: () => getAllBrands("name"),
  });

  return { data, isLoading, isError, error };
}
