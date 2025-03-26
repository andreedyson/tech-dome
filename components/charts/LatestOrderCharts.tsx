"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getLatestOrders } from "@/lib/data/order";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChartSpline, LoaderCircle } from "lucide-react";

export function LatestOrderCharts() {
  const { data, isLoading } = useQuery({
    queryKey: ["order-charts"],
    queryFn: async () => getLatestOrders(),
  });

  const chartData = data
    ? data.map((order) => ({
        date: new Date(order.createdAt),
        total: order.total,
      }))
    : [];

  const groupedData = chartData.reduce<Record<string, number>>((acc, entry) => {
    const dateKey = entry.date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
    acc[dateKey] = (acc[dateKey] || 0) + entry.total;
    return acc;
  }, {});

  const result: { date: string; total: number }[] = Object.entries(
    groupedData,
  ).map(([date, total]) => ({ date: formatDate(new Date(date)), total }));

  const chartConfig = {
    date: {
      label: "Date",
      color: "#9661f1",
    },
    total: {
      label: "Total",
      color: "#9661f1",
    },
  } satisfies ChartConfig;

  if (isLoading)
    return (
      <div className="flex h-[200px] w-full flex-col items-center justify-center lg:h-[350px]">
        <LoaderCircle className="size-10 animate-spin text-main-violet-700" />
      </div>
    );

  return (
    <div className="w-full space-y-3.5">
      <div className="space-y-1.5">
        <p className="flex items-center gap-1 text-base font-semibold leading-none md:text-lg">
          <ChartSpline className="size-4" />
          Latest Orders
        </p>
        <p className="leading-none text-muted-foreground">
          Showing the list of orders that are made from the past two weeks.
        </p>
      </div>
      <ChartContainer
        config={chartConfig}
        className="h-full min-h-[280px] w-full md:h-[300px]"
      >
        <AreaChart
          accessibilityLayer
          data={result}
          margin={{
            left: 40,
            right: 40,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={0}
            tickFormatter={(value) => value.slice(0, 6)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <defs>
            <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-total)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-total)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="total"
            type="natural"
            fill="url(#fillTotal)"
            fillOpacity={0.4}
            stroke="var(--color-total)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-total)",
            }}
            activeDot={{
              r: 6,
            }}
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
