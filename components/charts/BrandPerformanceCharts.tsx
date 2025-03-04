"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getBrandSales } from "@/lib/data/brand";

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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <ChartContainer
        config={chartConfig}
        className="max-h-[300px] min-h-[280px] max-[430px]:max-w-[240px] min-[350px]:w-full"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="brand"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
        </BarChart>
      </ChartContainer>
      <div className="flex w-full flex-col items-center justify-center text-center text-sm">
        <div className="flex gap-2 font-medium">
          <ShoppingCart strokeWidth={3} className="size-4" />
          {totalSales} products sold total from all brands
        </div>
        <div className="text-muted-foreground">
          Showing total sales for each brands
        </div>
      </div>
    </div>
  );
}
