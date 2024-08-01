// @ts-nocheck
import { IMarketWithTopicDetails } from "@/supabase/queries/useGetTrendingMarkets";
import { parseOptions } from "@/utils/predictions/parseOption";
import { stripEmoji } from "@/utils/string/stripEmoji";

export function formatMarketArr(
  {
    markets,
    selectedTopic,
  }: {
    markets: IMarketWithTopicDetails[]
    selectedTopic?: string;
  }
) {
  const strippedSelectedTopic = stripEmoji(selectedTopic ?? "");
  const enrichedFeedData = markets
    ?.map(formatMarket)
    ?.filter((item) =>
      selectedTopic
        ? selectedTopic === "🔥 Trending"
          ? true
          : stripEmoji(item?.topic ?? item?.name) === strippedSelectedTopic
        : true
    );
  return enrichedFeedData ?? [];
}


export function formatMarket(market: IMarketWithTopicDetails) {
  return {
    ...market,
    marketId: market?.id,
    name: market?.title, // Use title as name
    description: market?.question, // Use question as description
    topic: market?.topic_title || "Unknown", // Extract topic title if available
    image: market?.image || "", // Use image if available
    icon: market?.topic_image, // You might need a default or conditional icon
    stake: market?.usdcstake,
    topicId: market?.topic_id,
    multiplier:
    market?.outcomea === market?.outcomeb
        ? 2
        : market?.outcomea > market?.outcomeb
        ? 1 + (100 - market?.outcomeb) / market?.outcomeb
        : 1 + (100 - market?.outcomea) / market?.outcomea,
    optionA: {
      multiplier: 1, // Dummy value, adjust as necessary
      name: parseOptions(market?.options, 1), // Assuming options array is not empty
      odds: market?.outcomea || 50, // Dummy odds, calculate or adjust as necessary
    },
    optionB: {
      multiplier: 1, // Dummy value
      name: parseOptions(market?.options, 2), // Assuming two options minimum
      odds: market?.outcomeb || 50, // Dummy odds
    },
    type: "market",
    topicBio: market?.topic_description,
  };
}
