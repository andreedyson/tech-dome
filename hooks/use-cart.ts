"use client";

import { CartProps } from "@/types/product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRef } from "react";

type CartState = {
  products: CartProps[];
  addProduct: (cart: CartProps) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeProduct: (id: string) => void;
  clearCart: () => void;
};

const createCartStore = (userId: string) =>
  create<CartState>()(
    persist(
      (set, get) => ({
        products: [],
        addProduct: (cart) =>
          set({
            products: [
              ...get().products.filter((product) => product.id !== cart.id),
              cart,
            ],
          }),
        increaseQuantity: (id: string) =>
          set({
            products: get().products.map((product) =>
              product.id === id
                ? { ...product, quantity: product.quantity + 1 }
                : product,
            ),
          }),
        decreaseQuantity: (id: string) =>
          set({
            products: get()
              .products.map((product) =>
                product.id === id
                  ? { ...product, quantity: product.quantity - 1 }
                  : product,
              )
              .filter((product) => product.quantity > 0),
          }),
        removeProduct: (id: string) =>
          set({
            products: get().products.filter((product) => product.id !== id),
          }),
        clearCart: () => set({ products: [] }),
      }),
      {
        name: `cart-${userId}`, // Unique per user
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );

export const useCart = (userId: string) => {
  const storeRef = useRef<ReturnType<typeof createCartStore> | undefined>(
    undefined,
  );

  if (!storeRef.current || storeRef.current.getState().products.length === 0) {
    storeRef.current = createCartStore(userId);
  }

  return storeRef.current();
};
