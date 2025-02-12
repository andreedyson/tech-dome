import Image from "next/image";
import React from "react";
import { Crown, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

function Hero() {
  return (
    <section className="mt-8 grid w-full place-content-center place-items-center gap-6 max-md:text-center md:grid-cols-2 md:justify-items-start">
      {/* Header & CTA*/}
      <div className="flex w-full flex-col max-md:order-last max-md:items-center max-md:justify-center">
        <div className="flex w-fit items-center gap-2 rounded-full border-2 bg-white px-3 py-2 text-sm font-semibold text-black shadow-md">
          <Crown size={20} />
          Most Popular Product in DealDome
        </div>

        <div className="mt-3 flex w-full flex-col max-md:items-center max-md:justify-center">
          <h1 className="max-w-[400px] text-balance text-2xl font-extrabold leading-none text-gray-900 md:max-w-[500px] md:text-3xl lg:text-4xl">
            Discover Perfect Tech,
            <span className="text-main-violet-600">
              {" "}
              Delivered to Your Door
            </span>
          </h1>
          <p className="mt-2 w-full max-w-[350px] text-balance text-sm text-gray-700 md:max-w-[400px] md:text-base">
            Explore cutting-edge gadgets, premium devices, and innovative
            solutions. Everything you need to stay ahead in the tech world, just
            a click away.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <Button className="rounded-full py-5 font-bold">
            <ShoppingCart strokeWidth={3} />
            Shop Now
          </Button>
          <Button variant={"link"} className="text-slate-500">
            Discover More
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="flex w-[80%] items-center justify-center md:w-full">
        <Image
          src={"/assets/landing-macbook.png"}
          width={1000}
          height={600}
          alt="Hero Image"
          className="w-full"
        />
      </div>
    </section>
  );
}

export default Hero;
