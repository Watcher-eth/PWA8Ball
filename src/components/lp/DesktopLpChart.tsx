// @ts-nocheck

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  GenericLineChart,
  DEFAULT_CHART_CONFIG,
} from "@/components/charts/GenericLineChart";
import { GenericAreaChart } from "@/components/charts/GenericAreaChart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const data = [
  { date: "2023-01", sales: 100 },
  { date: "2023-02", sales: 150 },
  { date: "2023-03", sales: 200 },
];

export function DesktopLpChart() {
  return (
    // <GenericLineChart chartData={chartData}  />
    <GenericAreaChart chartData={data} xAxisKey="date" />
  );
}
