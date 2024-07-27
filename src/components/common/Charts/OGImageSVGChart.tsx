import React from "react";
import { LineChart, Line } from "recharts";
import { renderToStaticMarkup } from "react-dom/server";

type Price = {
  value: number;
  date: Date;
};

type OGChartData = {
  prices: Price[];
};

function Chart({ prices }: OGChartData) {
  return (
    <LineChart width={1200} height={630} data={prices}>
      <Line
        type="monotone"
        dataKey="value"
        stroke="#FF0050"
        strokeWidth={5}
        dot={false}
      />
    </LineChart>
  );
}

export function generateChartSVG(prices: Price[]) {
  return renderToStaticMarkup(<Chart prices={prices} />);
}
