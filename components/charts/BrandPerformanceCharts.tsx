"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getBrandSales } from "@/lib/data/brand";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, ShoppingCart } from "lucide-react";
import Image from "next/image";

type BrandPerformanceChartsProps = {
  totalBrand?: number;
};

export function BrandPerformanceCharts({
  totalBrand = 4,
}: BrandPerformanceChartsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["brand-performance"],
    queryFn: async () => await getBrandSales(),
  });

  const chartData = data?.slice(0, totalBrand);

  const chartConfig = {
    sales: {
      label: "Sales",
      color: "#9661f1",
    },
  } satisfies ChartConfig;

  const totalSales = chartData?.reduce((acc, curr) => {
    return acc + curr.sales;
  }, 0);

  if (isLoading)
    return (
      <div className="flex h-[200px] w-full flex-col items-center justify-center lg:h-[450px]">
        <LoaderCircle className="size-10 animate-spin text-main-violet-700" />
      </div>
    );

  return chartData && chartData.length > 0 ? (
    <div className="h-full space-y-4">
      <ChartContainer
        config={chartConfig}
        className="h-[70%] min-h-[280px] w-full md:h-[75%] lg:h-full"
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            right: 16,
          }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="brand"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <XAxis dataKey="sales" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar
            dataKey="sales"
            layout="vertical"
            fill="var(--color-sales)"
            radius={4}
          >
            <LabelList
              dataKey="brand"
              position="insideLeft"
              offset={8}
              className="fill-white font-semibold"
              fontSize={12}
            />
            <LabelList
              dataKey="sales"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>

      <div className="flex w-full flex-col items-center justify-center text-center text-sm">
        <div className="flex gap-2 font-medium">
          <ShoppingCart strokeWidth={3} className="size-4" />
          {totalSales} Products sold total from all Brands
        </div>
        <div className="text-muted-foreground">
          Showing total sales for each brands
        </div>
      </div>
    </div>
  ) : (
    <div className="col-span-full flex h-full flex-col items-center justify-center gap-2 text-center">
      <Image
        src={"/assets/empty-vault.svg"}
        width={500}
        height={300}
        alt="Products Not Found"
        className="aspect-video size-[180px] lg:size-[280px]"
        priority
      />
      <div className="space-y-0.5">
        <h4 className="text-sm font-semibold md:text-base">No Brands Found</h4>
        <p className="max-w-md text-xs md:text-sm">
          Showing the list of brands with the amount of products sold.
        </p>
      </div>
    </div>
  );
}
