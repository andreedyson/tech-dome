import { Building } from "lucide-react";
import Image from "next/image";
import React from "react";

function BrandsPage() {
  return (
    <section className="w-full">
      <div className="relative h-[400px] w-full">
        <Image
          src={"/assets/macbook-laptop.jpg"}
          width={1000}
          height={500}
          alt="ROG"
          className="h-full w-full rounded-xl object-cover object-top"
        />
        <div className="absolute inset-0 rounded-xl bg-black opacity-50" />

        {/* Brand Hero Text */}
        <div className="absolute top-0 flex w-full flex-col items-center justify-center px-12 py-20 max-lg:order-last">
          <div className="flex w-fit items-center gap-2 rounded-full border-2 bg-white px-3 py-2 text-sm font-semibold text-black shadow-md">
            <Building size={20} />
            Top Quality Tech Brands
          </div>
          <div className="mt-3 flex w-full flex-col items-center justify-center">
            <h1 className="max-w-[350px] text-center text-2xl font-extrabold leading-none text-white md:text-3xl lg:max-w-[500px] lg:text-4xl">
              Discover Top Tech Brands <br />
              <span className="text-main-violet-400">
                {" "}
                for Innovation & Quality
              </span>
            </h1>
            <p className="mt-2 w-full max-w-[350px] text-center text-sm text-slate-300 lg:max-w-[400px] lg:text-base">
              Explore a curated selection of the most trusted tech brands,
              bringing you cutting-edge innovation, quality, and performance.
              Find the perfect brand for your next upgrade! Let me know if you’d
              like any tweaks! 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandsPage;
