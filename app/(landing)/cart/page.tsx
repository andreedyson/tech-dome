import CartProducts from "@/components/cart/CartProducts";
import CheckoutForm from "@/components/cart/CheckoutForm";
import React from "react";

function CartPage() {
  return (
    <section className="w-full space-y-8">
      {/* Cart Products */}
      <div className="space-y-2 md:space-y-4">
        <h2 className="text-2xl font-bold md:text-3xl">Checkout Cart</h2>
        <CartProducts />
      </div>
      {/* Checkout Form Details */}
      <CheckoutForm />
    </section>
  );
}

export default CartPage;
