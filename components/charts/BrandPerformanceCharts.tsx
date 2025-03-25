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
import { ShoppingCart } from "lucide-react";

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
    <div className="h-full space-y-4">
      <ChartContainer
        config={chartConfig}
        className="h-[80%] min-h-[280px] w-full md:h-[85%]"
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
          {totalSales} products sold total from all brands
        </div>
        <div className="text-muted-foreground">
          Showing total sales for each brands
        </div>
      </div>
    </div>
  );
}
