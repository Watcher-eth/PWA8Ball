import { formatMarketArr } from "@/utils/markets/formatMarketArr";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { MarketCard } from "./MarketCard";




export function FeaturedMarketsSection({ markets }) {
  const enrichedFeedData = formatMarketArr({
    markets,
    selectedTopic: "🔥 Trending",
  });

  return (
    <div className="flex flex-col w-full">
      <div className="text-[1.8rem] text-white font-[Aeonik-Bold] mb-7 space-x-2">
        Trending Today
      </div>
      <Carousel className="flex flex-row space-x-7">
        <CarouselContent>
          {enrichedFeedData.map((item, index) => {
            if (index > 24)
              return (
                <CarouselItem className="basis-1/2 w-1/2">
                  <MarketCard key={index} item={item} isTwoCards={true} />
                </CarouselItem>
              );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
