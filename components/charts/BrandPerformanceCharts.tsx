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

const chartData = [
  { brand: "Logitech", sales: 186 },
  { brand: "Asus", sales: 305 },
  { brand: "Razer", sales: 237 },
  { brand: "Fantech", sales: 73 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function BrandPerformanceCharts() {
  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[300px] min-h-[200px] max-[430px]:max-w-[240px] min-[350px]:w-full"
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
  );
}
