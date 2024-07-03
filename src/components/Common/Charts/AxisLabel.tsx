import React from "react";
import { GraphPoint } from "../../../utils/chartUtils";

export const AxisLabel: React.FC<{ x: number; value: number }> = ({
  x,
  value,
}) => (
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
);

export type { GraphPoint };
