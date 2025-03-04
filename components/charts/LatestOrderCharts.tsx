"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getLatestOrders } from "@/lib/data/order";
import { formatDate } from "@/lib/utils";

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

  if (isLoading) return <div>Loading...</div>;

  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[300px] min-h-[280px] max-[430px]:max-w-[240px] min-[350px]:w-full"
    >
      <LineChart
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
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="total"
          type="natural"
          stroke="var(--color-total)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-total)",
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ChartContainer>
  );
}
