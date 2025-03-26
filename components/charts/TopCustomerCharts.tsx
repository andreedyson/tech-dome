"use client";

import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getTopCustomers } from "@/lib/data/user";
import { Skeleton } from "../ui/skeleton";
import { LoaderCircle, TrendingUp } from "lucide-react";

// Predefined chart colors
const predefinedColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

// Shuffle function to randomize colors
const shuffleArray = <T,>(array: T[]): T[] => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const chartConfig = {
  name: {
    label: "User",
  },
} satisfies ChartConfig;

export function TopCustomerCharts() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["top-customers"],
    queryFn: async () => getTopCustomers(),
  });

  // Assign shuffled colors to each data point
  const formattedChartData = useMemo(() => {
    if (!chartData) return [];

    const shuffledColors = shuffleArray(predefinedColors);

    return chartData.map((data, index) => ({
      ...data,
      fill: shuffledColors[index % shuffledColors.length],
    }));
  }, [chartData]);

  const totalTopOrders = useMemo(() => {
    return chartData?.reduce((acc, curr) => acc + curr.totalOrders, 0) || 0;
  }, [chartData]);

  if (isLoading)
    return (
      <div className="flex h-[200px] w-full flex-col items-center justify-center md:h-[350px]">
        <LoaderCircle className="size-10 animate-spin text-main-violet-700" />
      </div>
    );

  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="h-[80%] min-h-[200px] w-full md:h-[85%]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={formattedChartData}
            dataKey="totalOrders"
            nameKey="name"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalTopOrders}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Total Orders
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex flex-col items-center justify-center gap-y-1.5 text-center text-sm">
        <p className="flex items-center gap-1 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
          {chartData?.length} Top Customers with {totalTopOrders} Total Orders{" "}
        </p>
        <div className="leading-none text-muted-foreground">
          Showing top customer with the amount of orders they made
        </div>
      </div>
    </div>
  );
}
