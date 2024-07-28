import _ from "lodash";
import {
  RadialBarChart,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  Label,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

import { generateChartConfig } from "./generateChartConfig";

export function GenericPolarChart({
  chartData,
  angleKey = "category",
  radiusKey = "percentage",
  customConfig,
}: {
  chartData: any[];
  angleKey?: string;
  radiusKey?: string;
  customConfig?: Partial<ChartConfig>;
}) {
  const chartConfig = generateChartConfig({
    data: chartData,
    xAxisKey: angleKey,
    customConfig,
  });

  return (
    <ChartContainer
      className="mx-auto aspect-square"
      config={chartConfig}
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={360}
        innerRadius={83}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-[#151515]"
          polarRadius={[50, 70, 90]}
        />
        <RadialBar dataKey={radiusKey} background cornerRadius={10} />
        <PolarRadiusAxis
          className="bg-[transparent]"
          tick={false}
          tickLine={false}
          axisLine={false}
        >
          <Label
            className="bg-[transparent]"
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                const totalPercentage = chartData.reduce(
                  (sum, entry) => sum + entry[radiusKey],
                  0
                );
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
                      className="fill-white text-4xl font-bold"
                    >
                      {totalPercentage}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-gray-400"
                    >
                      Accuracy
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
