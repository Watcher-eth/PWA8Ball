// @ts-nocheck

import React, { useState } from "react";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

export interface GraphPoint {
  value: number;
  date: Date;
}

const SIZE = 800; // Adjust based on your preference

const calculateXPosition = (index: number, dataLength: number) => {
  const graphWidth = SIZE * 0.9; // Assuming the graph takes the full width for simplicity
  return (graphWidth / (dataLength - 1)) * index;
};

function getRandomFluctuation(baseValue: number) {
  const fluctuation = baseValue * 0.0055; // 0.55% of the base value
  const randomFactor = Math.random() * 2 - 1; // Random value between -1 and 1
  return baseValue + fluctuation * randomFactor;
}

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

const tooltipStyles = {
  ...defaultStyles,
  background: "#7476df",
  border: "1px solid white",
  color: "white",
  padding: "0.5rem",
};

const AxisLabel = styled.div<{ x: number }>`
  position: absolute;
  left: ${(props) => props.x}px;
  bottom: 0;
  padding: 2px 4px;
  background-color: white;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 700;
  color: #999999;
  opacity: 0.9;
`;

export const AnimatedChart: React.FC<{
  prices: GraphPoint[];
  option?: number;
}> = ({ prices, option }) => {
  const [price, setPrice] = useState<GraphPoint>();
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } =
    useTooltip<GraphPoint>();

  const allPricesSame = prices.every((p) => p.value === prices[0].value);

  const adjustedPrices = allPricesSame
    ? prices.map((p) => ({ ...p, value: getRandomFluctuation(p.value) }))
    : prices.map((p) => ({ ...p, value: p.value / 100 }));

  const maxValue = Math.max(...adjustedPrices.map((p) => p.value));
  const minValue = Math.min(...adjustedPrices.map((p) => p.value));

  const range = maxValue - minValue;
  const scaleThreshold = 0.1;

  const scaledPrices =
    range < scaleThreshold
      ? adjustedPrices.map((p) => ({
          ...p,
          value: (p.value - minValue) * (1 / range) * scaleThreshold + minValue,
        }))
      : adjustedPrices;

  const maxIndex = scaledPrices.findIndex((p) => p.value === maxValue);
  const minIndex = scaledPrices.findIndex((p) => p.value === minValue);

  const maxX = calculateXPosition(maxIndex, prices.length);
  const minX = calculateXPosition(minIndex, prices.length);

  const dateScale = scaleTime({
    domain: [
      Math.min(...scaledPrices.map((d) => d.date)),
      Math.max(...scaledPrices.map((d) => d.date)),
    ],
    range: [0, SIZE],
  });

  const valueScale = scaleLinear({
    domain: [
      Math.min(...scaledPrices.map((d) => d.value)),
      Math.max(...scaledPrices.map((d) => d.value)),
    ],
    range: [SIZE, 0],
    nice: true,
  });

  const handleMouseMove = (event: React.MouseEvent) => {
    const { x, y } = localPoint(event) || { x: 0, y: 0 };
    const x0 = dateScale.invert(x);
    const index = scaledPrices.findIndex(
      (d) => d.date.getTime() === x0.getTime()
    );
    const d = scaledPrices[index];
    if (d) {
      showTooltip({
        tooltipData: d,
        tooltipLeft: x,
        tooltipTop: y,
      });
      setPrice(d);
    }
  };

  return (
    <ChartContainer>
      <svg width={SIZE} height={"35vh"}>
        <LinePath
          data={scaledPrices}
          x={(d) => dateScale(d.date)}
          y={(d) => valueScale(d.value)}
          stroke={option === 0 ? "#FF0050" : "#0050FF"}
          strokeWidth={6}
          curve={curveMonotoneX}
        />
      </svg>
      {tooltipData && (
        <TooltipWithBounds
          left={tooltipLeft}
          top={tooltipTop}
          style={tooltipStyles}
        >
          {`Value: ${tooltipData.value.toFixed(2)}`}
        </TooltipWithBounds>
      )}
    </ChartContainer>
  );
};
