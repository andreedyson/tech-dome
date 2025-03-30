import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BrandPerformanceCharts } from "../charts/BrandPerformanceCharts";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { BrandTotalProductsProps } from "@/types/brand";

type BrandsPerformanceCardProps = {
  brandProducts: BrandTotalProductsProps[];
};

function BrandsPerformanceCard({ brandProducts }: BrandsPerformanceCardProps) {
  return (
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
            <TabsContent value="performance" className="h-full">
              <BrandPerformanceCharts totalBrand={6} />
            </TabsContent>
            <TabsContent value="highest" className="h-full">
              {brandProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-8 sm:max-lg:grid-cols-3">
                  {brandProducts.slice(0, 14).map((brand) => (
                    <div key={brand.id} className="flex items-center gap-2">
                      <Image
                        src={getImageUrl(brand.logo, "brands")}
                        width={80}
                        height={80}
                        alt={brand.name}
                        className="aspect-video w-12 rounded-lg border-2 object-contain xl:w-16 2xl:w-20"
                      />
                      <div>
                        <p className="line-clamp-1 font-bold md:text-sm">
                          {brand.name}
                        </p>
                        <p className="text-xs">{brand.totalProducts} Items</p>
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
  );
}

export default BrandsPerformanceCard;
