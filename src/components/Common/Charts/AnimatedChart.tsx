import React, { useState } from "react";
import { GraphPoint } from "../../../utils/chartUtils";
import { LinearGradient } from "@visx/gradient";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { max, extent } from "d3-array";
import { localPoint } from "@visx/event";
import { TooltipWithBounds, useTooltip } from "@visx/tooltip";

export const AnimatedChart = (props: {
  prices: GraphPoint[];
  option?: number;
}) => {
  const { prices } = props;
  const [tooltipData, setTooltipData] = useState<GraphPoint | null>(null);

  const width = 800;
  const height = 400;
  const margin = { top: 20, bottom: 40, left: 50, right: 20 };

  const xScale = scaleTime({
    domain: extent(prices, (d) => d.date) as [Date, Date],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [0, max(prices, (d) => d.value) || 0],
    range: [height - margin.bottom, margin.top],
  });

  return (
    <svg width={width} height={height}>
      <LinearGradient id="line-gradient" from="#0050FF" to="#FF0050" />
      <AxisLeft scale={yScale} top={0} left={margin.left} />
      <AxisBottom scale={xScale} top={height - margin.bottom} />
      <LinePath
        data={prices}
        x={(d) => xScale(d.date) ?? 0}
        y={(d) => yScale(d.value) ?? 0}
        stroke="url(#line-gradient)"
        strokeWidth={2}
      />
      {tooltipData && (
        <g>
          <circle
            cx={xScale(tooltipData.date)}
            cy={yScale(tooltipData.value)}
            r={4}
            fill="black"
          />
          <TooltipWithBounds
            left={xScale(tooltipData.date)}
            top={yScale(tooltipData.value)}
          >
            {`$${tooltipData.value}`}
          </TooltipWithBounds>
        </g>
      )}
    </svg>
  );
};
