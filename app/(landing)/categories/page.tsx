import { Button } from "@/components/ui/button";
import { getTotalProductsByCategory } from "@/lib/data/category";
import { University } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function CategoriesPage() {
  const categoriesProducts = await getTotalProductsByCategory();
  return (
    <div>
      <h1 className="max-w-[350px] text-2xl font-extrabold leading-none md:text-3xl lg:max-w-[500px] lg:text-4xl">
        Shop by
        <span className="text-main-violet-500"> Category</span>
      </h1>
      <div className="mt-6 w-full">
        {categoriesProducts.length ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categoriesProducts.map((category) => (
              <div
                key={category.name}
                className="rounded-xl border-2 p-4 shadow-md duration-200 hover:border-yellow-500"
              >
                <p className="text-lg font-bold">{category.name}</p>
                <p className="text-muted-foreground">
                  {category.totalProducts} Products
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center gap-2 text-center">
            <Image
              src={"/assets/empty-file.svg"}
              width={500}
              height={300}
              alt="Products Not Found"
              className="aspect-video size-[180px] lg:size-[280px]"
              priority
            />
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold md:text-base">
                No Categories Found
              </h4>
              <p className="max-w-md text-xs md:text-sm">
                Showing product categories that are available on DealDome.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Promotional Banner */}
      <div className="relative mt-12 h-[350px] w-full md:h-[400px]">
        <Image
          src={"/assets/macbook-half-open.jpg"}
          width={1000}
          height={500}
          alt="MacBook Half Open"
          className="h-full w-full rounded-xl object-cover"
        />
        <div className="absolute inset-0 rounded-xl bg-black opacity-50" />
        <div className="absolute top-0 flex w-full flex-col px-12 py-16 max-lg:order-last">
          <div className="flex w-fit -skew-x-12 transform items-center gap-2 border-2 bg-white px-3 py-0.5 text-xs font-semibold text-black shadow-md md:text-sm">
            Gear Up for New Semester
          </div>
          <div className="mt-4 flex w-full flex-col">
            <h1 className="max-w-[350px] text-xl font-extrabold leading-none text-white md:text-2xl lg:max-w-[500px] lg:text-3xl">
              Up to <span className="text-main-violet-400">20%</span> on <br />{" "}
              Laptop & Accessories
            </h1>
            <p className="mt-2 w-full max-w-[350px] text-xs text-slate-300 md:text-sm lg:max-w-[400px] lg:text-base">
              Get ready for the new semester with exclusive discounts on
              laptops, tablets, and study essentials! Equip yourself with the
              tech you need to succeed. Shop now and ace your classes!
            </p>
          </div>
          <Link href={"/catalogs"}>
            <Button className="mt-3 flex w-fit md:mt-5">
              <University />
              Shop the Student Deals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
