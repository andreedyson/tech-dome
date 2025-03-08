import { LANDING_TESTIMONIALS } from "@/constants";
import { Crown, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

function Hero() {
  return (
    <section className="mt-8 w-full">
      <div className="grid place-content-center place-items-center gap-6 max-lg:text-center lg:grid-cols-2 lg:justify-items-start">
        {/* Header & CTA*/}
        <div className="flex w-full flex-col max-lg:order-last max-lg:items-center max-lg:justify-center">
          <div className="flex w-fit items-center gap-2 rounded-full border-2 bg-white px-3 py-2 text-sm font-semibold text-black shadow-md">
            <Crown size={20} />
            Most Popular Product in TechDome
          </div>
          <div className="mt-3 flex w-full flex-col max-lg:items-center max-lg:justify-center">
            <h1 className="max-w-[400px] text-balance text-2xl font-extrabold leading-none text-gray-900 md:text-3xl lg:max-w-[500px] lg:text-4xl">
              Discover Perfect Tech,
              <span className="text-main-violet-600">
                {" "}
                Delivered to Your Door
              </span>
            </h1>
            <p className="mt-2 w-full max-w-[350px] text-balance text-sm text-gray-700 lg:max-w-[400px] lg:text-base">
              Explore cutting-edge gadgets, premium devices, and innovative
              solutions. Everything you need to stay ahead in the tech world,
              just a click away.
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
        <div className="flex w-[80%] items-center justify-center lg:w-full">
          <Image
            src={"/assets/landing-macbook.png"}
            width={1000}
            height={600}
            alt="Hero Image"
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-12 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {LANDING_TESTIMONIALS.map((testi) => (
            <div key={testi.name} className="flex items-center gap-4">
              <div className="size-10 lg:size-12">
                <Image
                  src={testi.image}
                  width={48}
                  height={48}
                  alt={testi.name}
                />
              </div>
              <div>
                <p className="line-clamp-1 text-sm font-bold md:text-base">
                  {testi.comment}
                </p>
                <p className="line-clamp-1 text-sm md:text-base">
                  {testi.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
