// @ts-nocheck

export const aggregatePredictions = (predictions) => {
  const aggregated = predictions.reduce((acc, prediction) => {
    const { market_id, option } = prediction;
    const optionObject = JSON.parse(option); // Parse the option JSON string
    // Create a unique key for the combination of market_id and option
    const key = `${market_id}-${optionObject.name}`;
    if (!acc[key]) {
      acc[key] = { ...prediction };
    } else {
      acc[key].amount += prediction.amount;
    }
    return acc;
  }, {});
  // Convert the aggregated object back to an array
  return Object.values(aggregated);
};


export const aggregatePredictedItems = (orders: any) => {
  const aggregated = {};

  orders.forEach((item: any) => {
    const key = `${item.market_id}-${item.option}`;
    if (aggregated[key]) {
      aggregated[key].amount += item.amount;
    } else {
      aggregated[key] = { ...item };
    }
  });

  return Object.values(aggregated);
};
