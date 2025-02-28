import StatsCard from "@/components/card/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getStatsCardData } from "@/lib/data/dashboard";
import { getSalesByCountry } from "@/lib/data/location";
import { getTopProducts } from "@/lib/data/product";
import { getTopCustomers } from "@/lib/data/user";
import { getImageUrl } from "@/lib/supabase";
import { convertRupiah } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function DashboardPage() {
  const statsCard = await getStatsCardData();
  const topProducts = await getTopProducts();
  const salesByCountry = await getSalesByCountry();
  const topCustomers = await getTopCustomers();

  return (
    <section className="w-full space-y-6">
      {/* Statistics Card */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCard.map((stat) => (
          <StatsCard
            key={stat.name}
            name={stat.name}
            total={stat.total}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid h-full w-full gap-4 md:grid-cols-4 lg:grid-cols-12 lg:grid-rows-2">
        {/* Top Selling Products Card */}
        <div className="md:col-span-4 lg:col-span-8 lg:row-span-2">
          <Card className="h-full border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Selling Products</CardTitle>
                <Link href={"/dashboard/products"}>
                  <Button variant={"outline"} size={"sm"}>
                    View All
                  </Button>
                </Link>
              </div>
              <Separator className="h-[2px]" />
            </CardHeader>
            <CardContent>
              {topProducts.length > 0 ? (
                topProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={getImageUrl(product.images[0], "products")}
                        width={64}
                        height={64}
                        alt={product.name}
                        className="size-16 md:size-[64px]"
                      />
                      <div className="leading-none">
                        <p className="line-clamp-1 text-base font-bold md:text-lg">
                          {product.name}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground md:text-base">
                          {product.category.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-sm sm:flex-row md:gap-6">
                      <p className="font-semibold">
                        {convertRupiah(product.price)}
                      </p>
                      <Badge className="rounded-full font-bold">
                        {product.totalOrders} Sold
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Total Customers Card */}
        <div className="md:col-span-2 lg:col-span-4 lg:col-start-9">
          <Card className="h-full border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Customers</CardTitle>
                <Link href={"/dashboard/customers"}>
                  <Button variant={"outline"} size={"sm"}>
                    View All
                  </Button>
                </Link>
              </div>
              <Separator className="h-[2px]" />
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {topCustomers.length > 0 ? (
                topCustomers.map((customer, index) => (
                  <div
                    key={customer.id + customer.name}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-muted-foreground">
                        {index + 1}.
                      </span>
                      <div>
                        <p
                          className="line-clamp-1 text-sm font-semibold lg:text-base"
                          title={customer.name}
                        >
                          {customer.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <p className="text-xl font-bold text-main-violet-500">
                            {customer.totalOrders}
                          </p>
                          <span className="font-light text-muted-foreground">
                            Orders
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sales by Country Card */}
        <div className="md:col-span-2 lg:col-span-4 lg:col-start-9">
          <Card className="h-full border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sales by Country</CardTitle>
                <Link href={"/dashboard/locations"}>
                  <Button variant={"outline"} size={"sm"}>
                    View All
                  </Button>
                </Link>
              </div>
              <Separator className="h-[2px]" />
            </CardHeader>
            <CardContent className="grid grid-cols-2">
              {salesByCountry.length > 0 ? (
                salesByCountry.map((country, index) => (
                  <div
                    key={country.id + country.name}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-muted-foreground">
                        {index + 1}.
                      </span>
                      <div>
                        <p
                          className="line-clamp-1 text-sm font-semibold lg:text-base"
                          title={country.name}
                        >
                          {country.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <p className="text-xl font-bold text-main-violet-500">
                            {country.totalSales}
                          </p>
                          <span className="font-light text-muted-foreground">
                            Sales
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Latest Orders</CardTitle>
              <Separator className="h-[2px]" />
            </CardHeader>
            <CardContent>
              <div></div>
              <div></div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Brand Performance</CardTitle>
              <Separator className="h-[2px]" />
            </CardHeader>
            <CardContent>
              <div></div>
              <div></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
