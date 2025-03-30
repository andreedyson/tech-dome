import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ChartBarBig, Sparkle } from "lucide-react";
import Image from "next/image";
import { convertRupiah } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { LowStockProductCharts } from "../charts/LowStockProductCharts";
import { TopProductProps } from "@/types/product";
import { getImageUrl } from "@/lib/supabase";

type ProductsOverviewCardProps = {
  topProducts: TopProductProps[];
};

function ProductsOverviewCard({ topProducts }: ProductsOverviewCardProps) {
  return (
    <div className="col-span-full w-full lg:col-span-8">
      <Card className="h-full border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Products Overview</CardTitle>
            <Link href={"/dashboard/products"}>
              <Button variant={"outline"} size={"sm"}>
                View All
              </Button>
            </Link>
          </div>
          <Separator className="h-[2px]" />
        </CardHeader>
        <CardContent className="h-[80%] w-full">
          <Tabs defaultValue="top-selling" className="h-full w-full">
            <div className="flex w-full justify-end">
              <TabsList className="w-[160px]">
                <TabsTrigger value="top-selling" className="w-full">
                  <Sparkle size={20} />
                </TabsTrigger>
                <TabsTrigger value="low-stocks" className="w-full">
                  <ChartBarBig size={20} />
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="top-selling" className="space-y-4">
              <div className="space-y-1.5 text-sm md:text-base">
                <p className="font-semibold leading-none">
                  Top Selling Products
                </p>
                <p className="leading-none text-muted-foreground">
                  Showing the top selling products in TechDome
                </p>
              </div>
              {topProducts.length > 0 ? (
                topProducts.slice(0, 5).map((product, i, arr) => (
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
                        <div className="space-y-1">
                          <p className="line-clamp-1 text-sm font-bold leading-none md:text-base">
                            {product.name}
                          </p>
                          <p className="text-sm font-medium leading-none text-muted-foreground">
                            {product.category.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-sm sm:flex-row md:gap-4">
                        <p className="font-semibold">
                          {convertRupiah(product.price)}
                        </p>
                        <Badge className="rounded-full font-bold">
                          {product.totalOrders} Sold
                        </Badge>
                      </div>
                    </div>
                    {i !== arr.length - 1 && <Separator />}
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
            </TabsContent>
            <TabsContent value="low-stocks" className="h-full">
              <div className="space-y-4">
                <div className="space-y-1.5 text-sm md:text-base">
                  <p className="font-semibold leading-none">
                    Low Stocks Products
                  </p>
                  <p className="leading-none text-muted-foreground">
                    Showing the list of products that are low in stocks
                  </p>
                </div>
                <LowStockProductCharts />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductsOverviewCard;
