// @ts-nocheck
import _ from "lodash"
import { Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { generateChartConfig } from "./generateChartConfig";


export function GenericLineChart({
  chartData,
  xAxisKey = "month",
  xAxisTickFormatter = (value) => value,
  customConfig,
}: {
  chartData: any[];
  xAxisKey?: string;
  xAxisTickFormatter?: (value: string) => string;
  customConfig?: Partial<ChartConfig>;
}) {
  const chartConfig = generateChartConfig({
    data: chartData,
    xAxisKey,
    customConfig,
  });

  return (
    <ChartContainer className="h-full w-full" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={xAxisTickFormatter}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {_.keys(chartConfig).map((key) => (
          <Line
            key={key}
            dataKey={key}
            type="monotone"
            stroke={chartConfig[key].color}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
