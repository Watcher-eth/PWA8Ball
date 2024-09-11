// @ts-nocheck

export const aggregatePredictions = (predictions) => {
  const aggregated = predictions.reduce((acc, prediction) => {
    const { market_id, option } = prediction
    const optionObject = JSON.parse(option) // Parse the option JSON string
    // Create a unique key for the combination of market_id and option
    const key = `${market_id}-${optionObject.name}`
    if (!acc[key]) {
      acc[key] = { ...prediction }
    } else {
      acc[key].amount += prediction.amount
    }
    return acc
  }, {})
  // Convert the aggregated object back to an array
  return Object.values(aggregated)
}

export const aggregatePredictedItems = (orders: any) => {
  const aggregated = {}

  orders?.forEach((item: any) => {
    const key = `${item.marketId}-${item.option}`
    if (aggregated[key]) {
      aggregated[key].amount += item.amount
    } else {
      aggregated[key] = { ...item }
    }
  })

  return Object.values(aggregated)
}

export const aggregatePredictedItemsWithImage = (orders: any, Markets: any) => {
  const aggregated: { [key: string]: any } = {}

  orders.forEach((item: any) => {
    const marketIdFromOrder = parseInt(item.market.marketId, 10) // Ensure it's an integer
    const market = Markets.find((m: any) => m.id === marketIdFromOrder)

    if (market && item.tokensOwned !== 0) {
      // Check that amount is not zero
      const updatedItem = {
        ...item,
        image: market.image,
      }

      const key = `${item.market.marketId}-${item.option}`

      if (aggregated[key]) {
        aggregated[key].tokensOwned += updatedItem.tokensOwned
      } else {
        aggregated[key] = { ...updatedItem }
      }
    }
  })

  // Filter out any aggregated items with amount === 0, just in case
  return Object.values(aggregated).filter((item: any) => item.tokensOwned !== 0)
}
