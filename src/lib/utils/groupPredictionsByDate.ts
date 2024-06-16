import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const groupPredictionsByDate = (predictions) => {
    if (!predictions) {
      return {};
    }
  
    const groupedPredictions = {};
  
    predictions.forEach((prediction) => {
      const createdAt = dayjs(prediction.created_at);
      const dateKey = createdAt.isToday()
        ? 'Today'
        : createdAt.isYesterday()
        ? 'Yesterday'
        : createdAt.format('MMMM D, YYYY');
  
      if (!groupedPredictions[dateKey]) {
        groupedPredictions[dateKey] = [];
      }
      groupedPredictions[dateKey].push(prediction);
    });
  
    return groupedPredictions;
  };
  