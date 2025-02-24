import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { University } from "lucide-react";

function CategoriesBanner() {
  return (
    <div className="relative mt-12 h-[350px] w-full md:h-[400px]">
      <Image
        src={"/assets/macbook-half-open.jpg"}
        width={1000}
        height={500}
        alt="MacBook Half Open"
        className="h-full w-full rounded-xl object-cover"
      />
      <div className="absolute inset-0 rounded-xl bg-black opacity-50" />
      <div className="sm: absolute top-4 flex w-full flex-col px-12 py-16 md:top-0">
        <div className="flex w-fit -skew-x-12 transform items-center gap-2 border-2 bg-white px-3 py-0.5 text-xs font-semibold text-black shadow-md md:text-sm">
          Gear Up for New Semester
        </div>
        <div className="mt-4 flex w-full flex-col">
          <h1 className="max-w-[350px] text-xl font-extrabold leading-none text-white md:text-2xl lg:max-w-[500px] lg:text-3xl">
            Up to <span className="text-main-violet-400">20%</span> on <br />{" "}
            Laptop & Accessories
          </h1>
          <p className="mt-2 w-full max-w-[350px] text-xs text-slate-300 md:text-sm lg:max-w-[400px] lg:text-base">
            Get ready for the new semester with exclusive discounts on laptops,
            tablets, and study essentials! Equip yourself with the tech you need
            to succeed. Shop now and ace your classes!
          </p>
        </div>
        <Link href={"/catalogs"}>
          <Button className="mt-3 hidden w-fit sm:flex md:mt-5">
            <University />
            Shop the Student Deals
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CategoriesBanner;
