import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { TopCustomerCharts } from "../charts/TopCustomerCharts";
import Image from "next/image";
import { TopCustomersProps } from "@/types/user";

type TopCustomersCardProps = {
  topCustomers: TopCustomersProps[];
};

function TopCustomersCard({ topCustomers }: TopCustomersCardProps) {
  return (
    <div className="col-span-full w-full md:col-span-4">
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
        </CardHeader>
        <CardContent className="h-[75%] w-full md:h-[80%]">
          {topCustomers.length > 0 ? (
            <TopCustomerCharts />
          ) : (
            <div className="col-span-full flex h-full flex-col items-center justify-center gap-2 text-center">
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
  );
}

export default TopCustomersCard;
