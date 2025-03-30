import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { SalesByLocationCharts } from "../charts/SalesByLocationCharts";
import Image from "next/image";
import { SalesByLocationProps } from "@/types/location";

type SalesByLocationCardProps = {
  salesByLocation: SalesByLocationProps[];
};

function SalesByLocationCard({ salesByLocation }: SalesByLocationCardProps) {
  return (
    <div className="col-span-full w-full md:col-span-4">
      <Card className="h-full w-full border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Sales by Location</CardTitle>
            <Link href={"/dashboard/locations"}>
              <Button variant={"outline"} size={"sm"}>
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="h-[75%] md:h-[80%]">
          {salesByLocation.length > 0 ? (
            <SalesByLocationCharts />
          ) : (
            <div className="flex h-full flex-col items-center gap-2 text-center">
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
  );
}

export default SalesByLocationCard;
