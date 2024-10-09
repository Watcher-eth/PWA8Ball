interface Prediction {
  initialProb: number;
  createdAt: number;
  resolvedAt: number;
  amount: number;
  isCorrect: boolean;
  topicId?: number;
  categoryWeight?: number;
}

function calculateGlobalScore(
  predictions: Prediction[],
  topicId: number | null = null
): number {
  let totalScore = 0;
  let totalWeight = 0;

  const totalPredictions = predictions.length;

  predictions.forEach((prediction) => {
    if (topicId && prediction.topicId !== topicId) {
      return;
    }

    const {
      initialProb,
      createdAt,
      resolvedAt,
      amount,
      isCorrect,
      categoryWeight = 1,
    } = prediction;

    const marketDuration = resolvedAt - createdAt;
    const timeScore =
      1 / (1 + Math.exp((Date.now() - createdAt) / marketDuration));
    const adjustedAmount = Math.log(1 + amount);
    const probWeight =
      initialProb <= 0.5
        ? 1 / (1 + Math.exp(initialProb * 10))
        : 1 / (1 + Math.exp((1 - initialProb) * 10));
    const consistency = Math.min(1, totalPredictions / 50);
    const correctnessFactor = isCorrect ? 1 : -1;
    const individualScore =
      probWeight *
      adjustedAmount *
      consistency *
      timeScore *
      correctnessFactor *
      categoryWeight;

    totalScore += individualScore;
    totalWeight += categoryWeight;
  });

  return totalWeight > 0 ? totalScore / totalWeight : 0;
}

const predictions: Prediction[] = [
  {
    initialProb: 0.45,
    createdAt: new Date("2024-10-01T12:00:00Z").getTime(),
    resolvedAt: new Date("2024-10-09T12:00:00Z").getTime(),
    amount: 100,
    isCorrect: true,
    topicId: 1,
    categoryWeight: 1.2,
  },
  {
    initialProb: 0.7,
    createdAt: new Date("2024-09-15T12:00:00Z").getTime(),
    resolvedAt: new Date("2024-09-20T12:00:00Z").getTime(),
    amount: 50,
    isCorrect: false,
    topicId: 2,
    categoryWeight: 1.0,
  },
];

const globalScore = calculateGlobalScore(predictions, 1);

console.log("Global Prediction Score:", globalScore);
