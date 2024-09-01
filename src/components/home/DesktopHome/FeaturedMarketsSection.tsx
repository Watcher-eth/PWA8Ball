import { formatMarketArr } from "@/utils/markets/formatMarketArr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MarketCard } from "./MarketCard";
import PaginationDots from "./CarouselDotButton";

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
      <Carousel>
        <CarouselContent className="flex flex-row space-x-3.5 w-full ">
          {enrichedFeedData.map((item, index) => {
            if (index <= 24) {
              // This was a correction, assuming you want to display these items
              return (
                <CarouselItem key={index} className="basis-1/2 w-1/2">
                  <MarketCard item={item} isTwoCards={true} />
                </CarouselItem>
              );
            }
            return null; // Return null for items that shouldn't be displayed
          })}
        </CarouselContent>
        <PaginationDots />
      </Carousel>
    </div>
  );
}
