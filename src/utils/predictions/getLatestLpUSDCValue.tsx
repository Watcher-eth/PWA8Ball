export function getLatestLpUsdcSum(lpPositionInfos) {
    const marketMap = {};
  
    lpPositionInfos.items.forEach((item) => {
      const { marketId, amountUsdc, timestamp } = item;
  
      // Only update if the current timestamp is greater than the stored one, or if it doesn't exist yet
      if (!marketMap[marketId] || timestamp > marketMap[marketId].timestamp) {
        marketMap[marketId] = { amountUsdc, timestamp };
      }
    });
  
    // Sum the latest amountUsdc for each marketId
    const totalUsdc = Object.values(marketMap).reduce(
      (sum, { amountUsdc }) => sum + parseFloat(amountUsdc),
      0
    );
  
    return totalUsdc;
  }
  