import _ from "lodash"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { generateChartConfig } from "./generateChartConfig"

export function GenericAreaChart({
  chartData,
  domain,
  xAxisKey = "month",
  xAxisTickFormatter = (value) => value,
  customConfig,
}: {
  domain: number[]
  chartData: any[]
  xAxisKey?: string
  xAxisTickFormatter?: (value: string) => string
  customConfig?: Partial<ChartConfig>
}) {
  const chartConfig = generateChartConfig({
    data: chartData,
    xAxisKey,
    customConfig,
  })

  return (
    <ChartContainer className="h-full w-full" config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 0,
          top: 10,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={xAxisTickFormatter}
        />
        <YAxis tick={false} hide axisLine={false} domain={domain} />

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          {_.keys(chartConfig).map((key) => (
            <linearGradient
              key={key}
              id={`fill${key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={chartConfig[key].color}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={chartConfig[key].color}
                stopOpacity={0.1}
              />
            </linearGradient>
          ))}
        </defs>
        {_.keys(chartConfig).map((key) => (
          <Area
            key={key}
            dataKey={key}
            type="natural"
            fill={`url(#fill${key})`}
            fillOpacity={0.4}
            stroke={chartConfig[key].color}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  )
}
