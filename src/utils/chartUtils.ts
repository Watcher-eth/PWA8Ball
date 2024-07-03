export interface GraphPoint {
  value: number;
  date: Date;
}

export const sampleData: GraphPoint[] = [
  { value: 10.941, date: new Date("2024-03-07") },
  { value: 11.62, date: new Date("2024-03-08") },
  { value: 9.7, date: new Date("2024-03-09") },
  { value: 11.275, date: new Date("2024-03-10") },
  { value: 12.948, date: new Date("2024-03-11") },
  { value: 12.94, date: new Date("2024-03-12") },
  { value: 12.432, date: new Date("2024-03-13") },
  { value: 12.94, date: new Date("2024-03-14") },
  { value: 14.55, date: new Date("2024-03-15") },
  { value: 13.82, date: new Date("2024-03-16") },
  { value: 11.94, date: new Date("2024-03-17") },
  { value: 10.94, date: new Date("2024-03-18") },
];

export const GRADIENT_FILL_COLORS = ["#7476df5D", "#7476df4D", "#7476df00"];

export const getRandomFluctuation = (baseValue: number) => {
  const fluctuation = baseValue * 0.0055; // 0.55% of the base value
  const randomFactor = Math.random() * 2 - 1; // Random value between -1 and 1
  return baseValue + fluctuation * randomFactor;
};

export const calculateXPosition = (
  index: number,
  dataLength: number,
  width: number
) => {
  const graphWidth = width * 0.9; // Assuming the graph takes the full width for simplicity
  return (graphWidth / (dataLength - 1)) * index;
};
