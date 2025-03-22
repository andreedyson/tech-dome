import { CartProps } from "@/types/product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartState = {
  products: CartProps[];
  addProduct: (cart: CartProps) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeProduct: (id: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (cart) =>
        set({
          products: [
            // Filter if the product is already in the cart
            ...get().products.filter((product) => product.id !== cart.id),
            cart,
          ],
        }),
      increaseQuantity: (id: string) => {
        const newProducts = get().products.map((product) => {
          // Increase the quantity of a product that's already in the cart
          if (product.id === id) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }

          return product;
        });

        set({
          products: newProducts,
        });
      },
      decreaseQuantity: (id: string) => {
        const newProducts = get().products.map((product) => {
          // Decrease the quantity of a product that's already in the cart
          if (product.id === id) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }

          return product;
        });

        set({
          products: newProducts.filter((product) => product.quantity !== 0),
        });
      },
      removeProduct: (id: string) =>
        set({
          products: [...get().products.filter((product) => product.id !== id)],
        }),
      clearCart: () => set({ products: [] }),
    }),
    {
      name: "cart-product-deal-dome",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
