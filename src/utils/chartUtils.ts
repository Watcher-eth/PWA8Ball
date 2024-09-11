export interface GraphPoint {
  value: number
  date: Date
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
]

export const GRADIENT_FILL_COLORS = ["#7476df5D", "#7476df4D", "#7476df00"]

export const getRandomFluctuation = (baseValue: number) => {
  const fluctuation = baseValue * 0.0055 // 0.55% of the base value
  const randomFactor = Math.random() * 2 - 1 // Random value between -1 and 1
  return baseValue + fluctuation * randomFactor
}

export const calculateXPosition = (
  index: number,
  dataLength: number,
  width: number
) => {
  const graphWidth = width * 0.9 // Assuming the graph takes the full width for simplicity
  return (graphWidth / (dataLength - 1)) * index
}

type Price = {
  price: number
  timestamp: number
  outcome: string
}

type ProcessedPrice = {
  value: number
  date: Date
  outcome?: string
}

type ProcessPricesResult = {
  currentPrices: ProcessedPrice[]
  percentageDifference: string | null
}

export const processPrices = (
  prices: Price[] | undefined,
  userOutcome: number,
  initialProb: number,
  timeframe: string
): ProcessPricesResult => {
  const initialProbValue = userOutcome === 1 ? initialProb : 100 - initialProb

  const currentPrices: ProcessedPrice[] = (prices || []).map((price) => ({
    value: userOutcome === 1 ? price.price / 100 : 100 - price.price / 100,
    date: new Date(price.timestamp * 1000),
    outcome: price.outcome,
  }))

  // Ensure there are at least two data points for the graph
  if (currentPrices.length === 1) {
    const oneMinuteLater = new Date(currentPrices[0].date.getTime() + 60000)
    currentPrices.unshift({ value: initialProbValue, date: oneMinuteLater })
    currentPrices.push({
      value: currentPrices[0].value + 1,
      date: oneMinuteLater,
    })
    currentPrices.push({
      value: currentPrices[0].value + 3,
      date: oneMinuteLater,
    })
  } else if (currentPrices.length === 0) {
    const now = new Date()
    const oneMinuteBefore = new Date(now.getTime() - 60000)
    currentPrices.push({ value: initialProbValue, date: oneMinuteBefore })
    currentPrices.push({ value: initialProbValue, date: now })
    currentPrices.push({
      value: initialProbValue,
      date: new Date(now.getTime() + 60000),
    })
  } else if (timeframe === "1M") {
    const oneMinuteLater = new Date(currentPrices[0].date.getTime() + 60000)
    currentPrices.unshift({ value: initialProbValue, date: oneMinuteLater })
  }

  let percentageDifference: string | null = null
  if (currentPrices.length > 1) {
    const firstPrice = currentPrices[0].value
    const lastPrice = currentPrices[currentPrices.length - 1].value
    percentageDifference = (
      ((lastPrice - firstPrice) / firstPrice) *
      100
    ).toFixed(2)
  } else {
    percentageDifference = "0"
  }

  return { currentPrices, percentageDifference }
}

export const getMinMaxValues = (prices: ProcessedPrice[]) => {
  if (!prices || prices.length === 0) {
    return { min: null, max: null }
  }

  return prices.reduce(
    (acc, price) => {
      if (price.value < acc.min) {
        acc.min = price.value
      }
      if (price.value > acc.max) {
        acc.max = price.value
      }
      return acc
    },
    { min: prices[0].value, max: prices[0].value }
  )
}
