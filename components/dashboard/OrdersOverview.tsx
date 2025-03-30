import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ChartNoAxesCombined, Table } from "lucide-react";
import { DataTable } from "../ui/data-table";
import { LatestOrderColumn } from "../orders/latest-order-columns";
import { columns } from "@/components/orders/latest-order-columns";
import Image from "next/image";
import { LatestOrderCharts } from "../charts/LatestOrderCharts";

type OrdersOverviewProps = {
  latestOrders: LatestOrderColumn[];
};

function OrdersOverview({ latestOrders }: OrdersOverviewProps) {
  return (
    <div className="h-full w-full">
      <Card className="h-full w-full border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Orders Overview</CardTitle>
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
            <div className="w-full">
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
                  data={latestOrders.slice(0, 16)}
                  pageSize={8}
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
  );
}

export default OrdersOverview;
