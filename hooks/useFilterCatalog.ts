import { ProductStatus } from "@prisma/client";
import { create } from "zustand";

export type Filter = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus[] | null;
  brands?: number[] | null;
  categories?: number[] | null;
  locations?: number[] | null;
};

export type FilterState = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const useFilterCatalog = create<FilterState>((set) => ({
  filter: {
    search: "",
    minPrice: 0,
    maxPrice: 0,
    status: null,
    brands: null,
    categories: null,
    locations: null,
  },
  setFilter: (filter) =>
    set((state) => ({
      filter: {
        ...state.filter,
        ...filter,
      },
    })),
}));
