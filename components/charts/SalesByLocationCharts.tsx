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
import { getSalesByLocation } from "@/lib/data/location";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, MapPin } from "lucide-react";
import { useMemo } from "react";

export function SalesByLocationCharts() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["sales-location"],
    queryFn: async () => getSalesByLocation(),
  });

  const chartConfig = {
    totalSales: {
      label: "Total Sales",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const totalSales = useMemo(() => {
    return chartData?.reduce((acc, curr) => acc + curr.totalSales, 0) || 0;
  }, [chartData]);

  if (isLoading)
    return (
      <div className="flex h-[200px] w-full flex-col items-center justify-center md:h-[350px]">
        <LoaderCircle className="size-10 animate-spin text-main-violet-700" />
      </div>
    );

  return (
    <div className="space-y-3.5">
      <ChartContainer
        config={chartConfig}
        className="h-[80%] min-h-[200px] w-full md:h-[85%]"
      >
        <BarChart
          accessibilityLayer
          data={chartData?.slice(0, 6)}
          margin={{
            top: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="totalSales" fill="var(--color-totalSales)" radius={4}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      <div className="flex w-full flex-col items-center justify-center gap-y-1.5 text-center text-sm">
        <p className="flex items-center gap-1 font-medium leading-none">
          <MapPin className="h-4 w-4" />
          {chartData?.length} Locations with {totalSales} Total Sales
        </p>
        <div className="leading-none text-muted-foreground">
          Showing the top selling locations with the amount of sales
        </div>
      </div>
    </div>
  );
}
