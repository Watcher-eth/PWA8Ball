type Price = {
  price: number;
  timestamp: number;
  outcome: string;
};

type ProcessedPrice = {
  value: number;
  date: Date;
  outcome?: string;
};

type ProcessPricesResult = {
  currentPrices: ProcessedPrice[];
  percentageDifference: string | null;
};

export const processPrices = (
  prices: Price[] | undefined,
  userOutcome: number,
  initialProb: number,
  timeframe: string
): ProcessPricesResult => {
  const initialProbValue = userOutcome === 1 ? initialProb : 100 - initialProb;

  const currentPrices: ProcessedPrice[] = (prices || []).map((price) => ({
    value: userOutcome === 1 ? price.price / 100 : 100 - price.price / 100,
    date: new Date(price.timestamp * 1000),
    outcome: price.outcome,
  }));

  // Ensure there are at least two data points for the graph
  if (currentPrices.length === 1) {
    const oneMinuteLater = new Date(currentPrices[0].date.getTime() + 60000);
    currentPrices.unshift({ value: initialProbValue, date: oneMinuteLater });
    currentPrices.push({
      value: currentPrices[0].value + 1,
      date: oneMinuteLater,
    });
    currentPrices.push({
      value: currentPrices[0].value + 3,
      date: oneMinuteLater,
    });
  } else if (currentPrices.length === 0) {
    const now = new Date();
    const oneMinuteBefore = new Date(now.getTime() - 60000);
    currentPrices.push({ value: initialProbValue, date: oneMinuteBefore });
    currentPrices.push({ value: initialProbValue, date: now });
    currentPrices.push({
      value: initialProbValue,
      date: new Date(now.getTime() + 60000),
    });
  } else if (timeframe === "1M") {
    const oneMinuteLater = new Date(currentPrices[0].date.getTime() + 60000);
    currentPrices.unshift({ value: initialProbValue, date: oneMinuteLater });
  }

  let percentageDifference: string | null = null;
  if (currentPrices.length > 1) {
    const firstPrice = currentPrices[0].value;
    const lastPrice = currentPrices[currentPrices.length - 1].value;
    percentageDifference = (
      ((lastPrice - firstPrice) / firstPrice) *
      100
    ).toFixed(2);
  } else {
    percentageDifference = "0";
  }

  return { currentPrices, percentageDifference };
};
