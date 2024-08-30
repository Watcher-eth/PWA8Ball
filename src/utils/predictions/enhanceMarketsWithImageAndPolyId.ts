// @ts-nocheck
export function enhanceMarketsWithImageAndPolyId(
  marketsData,
  constantData,
  hardTopics
) {
  return marketsData?.map((market) => {
    // Find the matching market in the constant data
    const matchingMarket = constantData.find(
      (item) => item.id === parseInt(market.marketId, 10)
    );

    // Find the matching topic in the hardTopics data
    const matchingTopic = hardTopics.find(
      (topic) => topic.id === market.topicId.toString()
    );

    // Create the options array
    const options = [
      { name: market.outcomeA, value: market.outcomeOddsA },
      { name: market.outcomeB, value: market.outcomeOddsB },
    ];
    // console.log("mrk", matchingMarket);
    // If a matching market is found, add the image, PolyId, options, and topic data
    if (matchingMarket) {
      return {
        ...market,
        image: matchingMarket.image,
        PolyId: matchingMarket.PolyId,
        options,
        description: market.question,
        optionA: { name: market.outcomeA, value: market.outcomeOddsA },
        optionB: { name: market.outcomeB, value: market.outcomeOddsB },
        topic_id: matchingTopic?.id || null,
        topic_title: matchingTopic?.title || null,
        topic_description: matchingTopic?.description || null,
        topic_image: matchingTopic?.image,
        icon: matchingTopic?.image,
        id: market?.marketId,
      };
    }

    // If no matching market is found, return the market with options and topic data added
    return {
      ...market,
      options,
      optionA: { name: market.outcomeA, value: market.outcomeOddsA },
      optionB: { name: market.outcomeB, value: market.outcomeOddsB },
      topic_id: matchingTopic?.id || null,
      topic_title: matchingTopic?.title || null,
      topic_description: matchingTopic?.description || null,
      icon: matchingTopic?.image || null,
      description: market.question,
      id: market?.marketId,
    };
  });
}

export function enhanceSingleMarketWithImageAndPolyId(
  market,
  constantData,
  hardTopics
) {
  // Find the matching market in the constant data
  const matchingMarket = constantData.find(
    (item) => item.id === parseInt(market?.id, 10)
  );

  // Find the matching topic in the hardTopics data
  const matchingTopic = hardTopics.find(
    (topic) => topic.id === market?.topicId?.toString()
  );

  console.log("matchingTopic", market);
  // Create the options array
  const options = [
    { name: market?.outcomeA, value: market?.outcomeOddsA },
    { name: market?.outcomeB, value: market?.outcomeOddsB },
  ];
  console.log("options", options);

  // If a matching market is found, add the image, PolyId, options, and topic data
  if (matchingMarket) {
    return {
      ...market,
      id: market?.id,
      image: matchingMarket?.image,
      PolyId: matchingMarket?.PolyId,
      options,
      question: market?.question,
      optionA: { name: market?.outcomeA, value: market?.outcomeOddsA },
      optionB: { name: market?.outcomeB, value: market?.outcomeOddsB },
      topic_id: matchingTopic?.id || null,
      topic_title: matchingTopic?.title || null,
      topic_description: matchingTopic?.description || null,
      topic_image: matchingTopic?.image,
      icon: matchingTopic?.image,
    };
  }

  // If no matching market is found, return the market with options and topic data added
  return {
    ...market,
    options,
    optionA: { name: market?.outcomeA, value: market?.outcomeOddsA },
    optionB: { name: market?.outcomeB, value: market?.outcomeOddsB },
    topic_id: matchingTopic?.id || null,
    topic_title: matchingTopic?.title || null,
    topic_description: matchingTopic?.description || null,
    icon: matchingTopic?.image || null,
    question: market?.question,
    id: market?.marketId,
    image: matchingMarket?.image,
  };
}

export function enhancePositionsWithImages(filteredPositions, hardMarkets) {
  return filteredPositions?.map((position) => {
    const matchingMarket = hardMarkets.find(
      (market) => market.id === parseInt(position.marketId, 10)
    );

    return {
      ...position,
      image: matchingMarket?.image || null, // Add the image if found, otherwise null
    };
  });
}
