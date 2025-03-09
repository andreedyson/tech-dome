import CartProducts from "@/components/cart/CartProducts";
import CheckoutForm from "@/components/cart/CheckoutForm";
import { getUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

async function CartPage() {
  const { session } = await getUser();

  return (
    <section className="h-[80vh]">
      {session ? (
        <div className="w-full space-y-8">
          {/* Cart Products */}
          <div className="space-y-2 md:space-y-4">
            <h2 className="text-2xl font-bold md:text-3xl">Checkout Cart</h2>
            <CartProducts />
          </div>
          {/* Checkout Form Details */}
          <CheckoutForm />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center gap-2 text-center">
          <Image
            src={"/assets/empty-vault.svg"}
            width={500}
            height={300}
            alt="User Not Found"
            className="aspect-video size-[180px] lg:size-[280px]"
            priority
          />
          <div className="space-y-0.5">
            <h4 className="text-sm font-semibold md:text-base">
              Unauthenticated User
            </h4>
            <div className="flex items-center gap-1 text-xs hover:underline md:text-sm">
              <p> You need to be logged in to access the shopping cart.</p>
              <Link
                href={"/sign-in"}
                className="font-semibold underline hover:text-main-violet-600"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CartPage;
