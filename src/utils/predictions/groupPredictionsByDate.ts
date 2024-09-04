import { formatDate } from "@/utils/datetime/formatDate";
import { isToday, isYesterday } from "@/utils/datetime/isDay";

export function groupPredictionsByDate(predictions: any[]) {
  const groupedPredictions: { [key: string]: any[] } = {};

  predictions?.forEach((prediction) => {
    const createdAt =  new Date(parseInt(prediction.createdAt, 10) * 1000);

    const dateKey = isToday(createdAt)
      ? "Today"
      : isYesterday(createdAt)
      ? "Yesterday"
      : formatDate(createdAt);

    if (!groupedPredictions[dateKey]) {
      groupedPredictions[dateKey] = [];
    }
    groupedPredictions[dateKey].push(prediction);
  });

  return groupedPredictions;
}
