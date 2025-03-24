"use client";

import { getAllLocations } from "@/lib/data/location";
import { Location } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useLocations() {
  const { data, isLoading, isError, error } = useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn: () => getAllLocations("name"),
  });

  return { data, isLoading, isError, error };
}
