
// @ts -nocheck
import { LpPosition, Market } from "@/__generated__/graphql";
import { HARD_MARKETS } from "@/constants/markets";
import { HARD_TOPICS } from "@/constants/topics";

type HardMarkets = typeof HARD_MARKETS;
type HardTopics = typeof HARD_TOPICS

export function enhanceMarketsWithImageAndPolyId(
  marketsData: Market[],
  constantData: HardMarkets,
  topics: HardTopics
) {
  return marketsData?.map((market) => {
    return enhanceSingleMarketWithImageAndPolyId(market, constantData, topics);
  });
}

export function enhanceSingleMarketWithImageAndPolyId(
  market: Market,
  constantData: HardMarkets,
  topics: HardTopics
) {
  const { matchingMarket, matchingTopic } = getMatchingData(
    market,
    constantData,
    topics
  );
  const result = enhanceMarketData(market, matchingMarket, matchingTopic);
  return result
}

export function enhancePositionsWithImages(
  filteredPositions: LpPosition[],
  markets: HardMarkets
) {
  return filteredPositions?.map((position) => ({
    ...position,
    image:
      markets.find((market) => market.id === parseInt(position.marketId, 10))?.image || null,
  }));
}

function getMatchingData(
  market: Market,
  constantData: HardMarkets,
  topics: HardTopics
) {
  const matchingMarket = constantData.find(
    (item) => item.id === parseInt(market?.marketId, 10)
  );
  const matchingTopic = topics.find(
    (topic) => topic.id === market?.topicId?.toString()
  );

  return { matchingMarket, matchingTopic };
}

function enhanceMarketData(
  market: Market,
  matchingMarket?: HardMarkets[number],
  matchingTopic?: HardTopics[number]
) {

  const optionA = { name: market?.outcomeA, value: market?.outcomeOddsA };
  const optionB = { name: market?.outcomeB, value: market?.outcomeOddsB };

  return {
    ...market,
    id: market?.marketId,
    image: matchingMarket?.image,
    PolyId: matchingMarket?.PolyId,
    options: [optionA, optionB],
    optionA: optionA,
    optionB: optionB,
    description: market?.question,
    topic_id: matchingTopic?.id,
    topic_title: matchingTopic?.title ,
    topic_description: matchingTopic?.description,
    topic_image: matchingTopic?.image,
    icon: matchingTopic?.image ,
  } as const;
}

/**
 * // @ts-nocheck
export function enhanceMarketsWithImageAndPolyId(
  marketsData,
  constantData,
  topics
) {
  return marketsData?.map((market) => {
    // Find the matching market in the constant data
    const matchingMarket = constantData.find(
      (item) => item.id === parseInt(market.marketId, 10)
    );

    // Find the matching topic in the topics data
    const matchingTopic = topics.find(
      (topic) => topic.id === market.topicId.toString()
    );

    // Create the options array
    const options = [
      { name: market.outcomeA, value: market.outcomeOddsA },
      { name: market.outcomeB, value: market.outcomeOddsB },
    ];
    // console.log("mrk", matchingMarket);
    // If a matching market is found, add the image, PolyId, options, and topic data
    const sharedInfo = {
      ...market,
      options,
      optionA: { name: market.outcomeA, value: market.outcomeOddsA },
      optionB: { name: market.outcomeB, value: market.outcomeOddsB },
      description: market.question,
      topic_id: matchingTopic?.id || null,
      topic_title: matchingTopic?.title || null,
      topic_description: matchingTopic?.description || null,
      topic_image: matchingTopic?.image,
      icon: matchingTopic?.image || null,
      id: market?.marketId,
    };
    if (matchingMarket) {
      return {
        ...market,
        image: matchingMarket.image,
        PolyId: matchingMarket.PolyId,
        options,
        optionA: { name: market.outcomeA, value: market.outcomeOddsA },
        optionB: { name: market.outcomeB, value: market.outcomeOddsB },
        description: market.question,
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
      description: market.question,
      topic_id: matchingTopic?.id || null,
      topic_title: matchingTopic?.title || null,
      topic_description: matchingTopic?.description || null,
      topic_image: matchingTopic?.image,
      icon: matchingTopic?.image || null,
      id: market?.marketId,
    };
  });
}

export function enhanceSingleMarketWithImageAndPolyId(
  market,
  constantData,
  topics
) {
  // Find the matching market in the constant data
  const matchingMarket = constantData.find(
    (item) => item.id === parseInt(market?.id, 10)
  );

  // Find the matching topic in the topics data
  const matchingTopic = topics.find(
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

export function enhancePositionsWithImages(filteredPositions, markets) {
  return filteredPositions?.map((position) => {
    const matchingMarket = markets.find(
      (market) => market.id === parseInt(position.marketId, 10)
    );

    return {
      ...position,
      image: matchingMarket?.image || null, // Add the image if found, otherwise null
    };
  });
}

 */
