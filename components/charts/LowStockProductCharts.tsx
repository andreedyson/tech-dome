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

  if (isLoading) return <div>Loading...</div>;

  return (
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
  );
}
