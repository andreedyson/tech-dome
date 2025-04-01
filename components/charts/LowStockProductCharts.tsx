"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getLowStocksProducts } from "@/lib/data/product";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";

// Function to determine color based on stock level
const getStockColor = (stock: number): string => {
  if (stock <= 1) return "hsl(0, 100%, 50%)"; // Red (Critical)
  if (stock <= 3) return "hsl(40, 100%, 50%)"; // Yellow (Moderate)
  if (stock <= 5) return "hsl(30, 100%, 50%)"; // Orange (Low)
  return "hsl(120, 80%, 40%)"; // Green (Sufficient)
};

const chartConfig = {
  stock: {
    label: "Stock",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function LowStockProductCharts() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["low-stocks"],
    queryFn: async () => getLowStocksProducts(),
  });

  if (isLoading)
    return (
      <div className="flex h-[200px] w-full flex-col items-center justify-center md:h-[350px]">
        <LoaderCircle className="size-10 animate-spin text-main-violet-700" />
      </div>
    );

  return chartData && chartData?.length > 0 ? (
    <ChartContainer
      config={chartConfig}
      className="h-[80%] min-h-[280px] w-full md:h-full"
    >
      <BarChart
        accessibilityLayer
        data={chartData?.slice(0, 5)}
        layout="vertical"
        margin={{ right: 16 }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="product"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <XAxis dataKey="stock" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="stock" layout="vertical" radius={4}>
          {chartData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getStockColor(entry.stock)} />
          ))}
          <LabelList
            dataKey="product"
            position="insideLeft"
            offset={8}
            className="fill-[--color-label]"
            fontSize={12}
          />
          <LabelList
            dataKey="stock"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
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
          No Low Stock Products
        </h4>
        <p className="max-w-md text-xs md:text-sm">
          Showing the list of products that are low in stock.
        </p>
      </div>
    </div>
  );
}
