import _ from "lodash"

import type { ChartConfig } from "@/components/ui/chart"

const DEFAULT_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
]

export function generateChartConfig({
  data,
  xAxisKey,
  customConfig = {},
}: {
  data: any[]
  xAxisKey: string
  customConfig?: Partial<ChartConfig>
}): ChartConfig {
  let config: ChartConfig = {}

  _.keys(data[0])
    .filter((key) => key !== xAxisKey)
    .forEach((key, index) => {
      config[key] = {
        label: key.charAt(0).toUpperCase() + key.slice(1),
        color: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      }
    })

  const chartConfig = { ...config, ...customConfig } as ChartConfig

  return chartConfig
}
