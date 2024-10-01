import { GraphPoint } from "@/utils/chartUtils"

export function AxisLabel({ x, value }: { x: number; value: number }) {
  return (
    <div
      style={{
      position: "absolute",
      left: x,
      bottom: 0,
      padding: "2px 4px",
      borderRadius: 4,
    }}
  >
    <span
      style={{ fontSize: 13, fontWeight: 700, color: "#999999", opacity: 0.9 }}
    >
      {`${value.toFixed(2)}%`}
      </span>
    </div>
  )
}

export type { GraphPoint }
