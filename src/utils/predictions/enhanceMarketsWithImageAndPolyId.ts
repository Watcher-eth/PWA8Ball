import { LpPosition, Market } from "@/__generated__/graphql";
import { HARD_MARKETS } from "@/constants/markets";
import { HARD_TOPICS } from "@/constants/topics";

type HardMarkets = typeof HARD_MARKETS;
type HardTopics = typeof HARD_TOPICS;

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
  const matchingMarket = constantData?.find(
    (item) => item.id === parseInt(market?.marketId, 10)
  );

  const matchingTopic = topics.find((topic) =>
    parseInt(market?.marketId, 10) === 3
      ? topic.id === "20"
      : topic.id === market?.topicId?.toString()
  );

  const result = enhanceMarketData(market, matchingMarket, matchingTopic);
  return result;
}

export function enhancePositionsWithImages(
  filteredPositions: LpPosition[],
  markets: HardMarkets
) {
  return filteredPositions?.map(
    (position) =>
      ({
        ...position,
        image:
          markets.find(
            (market) => market.id === parseInt(position.marketId, 10)
          )?.image || null,
      } as const)
  );
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
    topic_title: matchingTopic?.title,
    topic_description: matchingTopic?.description,
    topic_image: matchingTopic?.image,
    icon: matchingTopic?.image,
  } as const;
}
