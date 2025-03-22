import StatsCard from "@/components/card/StatsCard";
import { BrandPerformanceCharts } from "@/components/charts/BrandPerformanceCharts";
import { LatestOrderCharts } from "@/components/charts/LatestOrderCharts";
import { columns } from "@/components/orders/latest-order-columns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBrandTotalProducts } from "@/lib/data/brand";
import { getStatsCardData } from "@/lib/data/dashboard";
import { getSalesByLocation } from "@/lib/data/location";
import { getLatestOrders } from "@/lib/data/order";
import { getTopProducts } from "@/lib/data/product";
import { getTopCustomers } from "@/lib/data/user";
import { getImageUrl } from "@/lib/supabase";
import { convertRupiah } from "@/lib/utils";
import { ChartNoAxesCombined, Table } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function DashboardPage() {
  const statsCard = await getStatsCardData();
  const topProducts = await getTopProducts();
  const salesByLocation = await getSalesByLocation();
  const topCustomers = await getTopCustomers();
  const latestOrders = await getLatestOrders();
  const brandProducts = await getBrandTotalProducts();

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
            <CardContent className="h-[80%] w-full">
              {topProducts.length > 0 ? (
                topProducts.slice(0, 6).map((product, i) => (
                  <div key={product.id}>
                    <div className="my-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src={getImageUrl(product.images[0], "products")}
                          width={64}
                          height={64}
                          alt={product.name}
                          className="size-16 md:size-[64px]"
                        />
                        <div>
                          <p className="line-clamp-1 text-base font-bold leading-none md:text-lg">
                            {product.name}
                          </p>
                          <p className="text-sm font-medium leading-none text-muted-foreground">
                            {product.category.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2 text-sm sm:flex-row md:gap-4">
                        <p className="font-semibold">
                          {convertRupiah(product.price)}
                        </p>
                        <Badge className="rounded-full font-bold">
                          {product.totalOrders} Sold
                        </Badge>
                      </div>
                    </div>
                    {i !== topProducts.length - 1 && <Separator />}
                  </div>
                ))
              ) : (
                <div className="col-span-full flex h-full flex-col items-center justify-center gap-2 text-center">
                  <Image
                    src={"/assets/empty-products.svg"}
                    width={500}
                    height={300}
                    alt="Products Not Found"
                    className="aspect-video size-[180px] lg:size-[280px]"
                    priority
                  />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-semibold md:text-base">
                      No Products Found
                    </h4>
                    <p className="max-w-md text-xs md:text-sm">
                      Showing the list of Top Selling Products on TechDome.
                    </p>
                  </div>
                </div>
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
                      <span className="text-2xl font-bold text-muted-foreground md:text-3xl">
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
                          <p className="text-base font-bold text-main-violet-500 md:text-lg">
                            {customer.totalOrders}
                          </p>
                          <span className="text-sm font-light text-muted-foreground md:text-base">
                            Orders
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex h-full flex-col items-center gap-2 text-center">
                  <Image
                    src={"/assets/empty-vault.svg"}
                    width={500}
                    height={300}
                    alt="Customers Not Found"
                    className="aspect-video w-[180px] lg:w-[280px]"
                    priority
                  />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-semibold md:text-base">
                      No Customers Found
                    </h4>
                    <p className="max-w-md text-xs md:text-sm">
                      Showing the list of Top Customers by total orders.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sales by Location Card */}
        <div className="md:col-span-2 lg:col-span-4 lg:col-start-9">
          <Card className="h-full border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sales by Location</CardTitle>
                <Link href={"/dashboard/locations"}>
                  <Button variant={"outline"} size={"sm"}>
                    View All
                  </Button>
                </Link>
              </div>
              <Separator className="h-[2px]" />
            </CardHeader>
            <CardContent className="grid grid-cols-2">
              {salesByLocation.length > 0 ? (
                salesByLocation.map((Location, index) => (
                  <div
                    key={Location.id + Location.name}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-muted-foreground md:text-3xl">
                        {index + 1}.
                      </span>
                      <div>
                        <p
                          className="line-clamp-1 text-sm font-semibold lg:text-base"
                          title={Location.name}
                        >
                          {Location.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <p className="text-base font-bold text-main-violet-500 md:text-lg">
                            {Location.totalSales}
                          </p>
                          <span className="text-sm font-light text-muted-foreground md:text-base">
                            Sales
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex h-full flex-col items-center gap-2 text-center">
                  <Image
                    src={"/assets/empty-cart.svg"}
                    width={500}
                    height={300}
                    alt="Countries Not Found"
                    className="aspect-video w-[180px] lg:w-[280px]"
                    priority
                  />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-semibold md:text-base">
                      No Location Found
                    </h4>
                    <p className="max-w-md text-xs md:text-sm">
                      Showing the list of Top Location by total sales.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Latest Orders Table */}
        <div className="col-span-full w-full lg:col-span-8">
          <Card className="h-full w-full border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Latest Orders</CardTitle>
                <Link href={"/dashboard/orders"}>
                  <Button variant={"outline"} size={"sm"}>
                    View All
                  </Button>
                </Link>
              </div>
              <Separator className="h-[2px]" />
            </CardHeader>
            <CardContent className="w-full">
              <Tabs defaultValue="order-table" className="h-full w-full">
                <div className="flex w-full justify-end">
                  <TabsList className="w-[160px]">
                    <TabsTrigger value="order-table" className="w-full">
                      <Table size={20} />
                    </TabsTrigger>
                    <TabsTrigger value="order-chart" className="w-full">
                      <ChartNoAxesCombined size={20} />
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="order-table">
                  {latestOrders.length > 0 ? (
                    <DataTable
                      columns={columns}
                      data={latestOrders}
                      pageSize={5}
                      columnFilter="id"
                    />
                  ) : (
                    <div className="col-span-full flex h-full flex-col items-center gap-2 text-center">
                      <Image
                        src={"/assets/empty-vault.svg"}
                        width={500}
                        height={300}
                        alt="Orders Not Found"
                        className="aspect-video w-[180px] lg:w-[380px]"
                        priority
                      />
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold md:text-base">
                          No Orders Found
                        </h4>
                        <p className="max-w-md text-xs md:text-sm">
                          Showing the list of orders from the past two weeks.
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="order-chart" className="h-full">
                  {latestOrders.length > 0 ? (
                    <LatestOrderCharts />
                  ) : (
                    <div className="col-span-full flex h-full flex-col items-center gap-2 text-center">
                      <Image
                        src={"/assets/empty-orders.svg"}
                        width={500}
                        height={300}
                        alt="Orders Not Found"
                        className="aspect-video w-[180px] lg:w-[380px]"
                        priority
                      />
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold md:text-base">
                          No Orders Found
                        </h4>
                        <p className="max-w-md text-xs md:text-sm">
                          Showing the list of orders from the past two weeks.
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Brand Performance Sales */}
        <div className="col-span-full w-full lg:col-span-4">
          <Card className="h-full border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Brands Perfomance</CardTitle>
                <Link href={"/dashboard/brands"}>
                  <Button variant={"outline"} size={"sm"}>
                    View All
                  </Button>
                </Link>
              </div>
              <Separator className="h-[2px]" />
            </CardHeader>
            <CardContent className="h-[85%] w-full">
              <Tabs defaultValue="performance" className="h-full w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="performance" className="w-full">
                    Performance
                  </TabsTrigger>
                  <TabsTrigger value="highest" className="w-full">
                    Brand Products
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="performance" className="h-[90%]">
                  <BrandPerformanceCharts totalBrand={6} />
                </TabsContent>
                <TabsContent value="highest" className="h-full">
                  {brandProducts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-8">
                      {brandProducts.slice(0, 14).map((brand) => (
                        <div key={brand.id} className="flex items-center gap-2">
                          <Image
                            src={getImageUrl(brand.logo, "brands")}
                            width={80}
                            height={80}
                            alt={brand.name}
                            className="aspect-video w-12 rounded-lg border-2 object-contain lg:w-16 2xl:w-20"
                          />
                          <div>
                            <p className="line-clamp-1 font-bold md:text-sm">
                              {brand.name}
                            </p>
                            <p className="text-xs">
                              {brand.totalProducts} Products
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="col-span-full flex h-full flex-col items-center justify-center gap-2 text-center">
                      <Image
                        src={"/assets/empty-cart.svg"}
                        width={500}
                        height={300}
                        alt="Sales Not Found"
                        className="aspect-video w-[180px] lg:w-[380px]"
                        priority
                      />
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold md:text-base">
                          No Brand or Sales Found
                        </h4>
                        <p className="max-w-md text-xs md:text-sm">
                          Showing the list of highest selling product from each
                          brand.
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
