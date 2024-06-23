
const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (someDate: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    someDate.getDate() === yesterday.getDate() &&
    someDate.getMonth() === yesterday.getMonth() &&
    someDate.getFullYear() === yesterday.getFullYear()
  );
};

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const groupPredictionsByDate = (predictions: any[]) => {
  if (!predictions) {
    return {};
  }

  const groupedPredictions: { [key: string]: any[] } = {};

  predictions.forEach((prediction) => {
    const createdAt = new Date(prediction.created_at);
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
};
