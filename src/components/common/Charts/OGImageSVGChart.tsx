import { LineChart, Line } from "recharts"
import { renderToStaticMarkup } from "react-dom/server"

type Price = {
  value: number
  date: Date
}

function Chart({ prices }: { prices: Price[] }) {
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
  )
}
