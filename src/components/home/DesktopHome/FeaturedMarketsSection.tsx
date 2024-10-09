import { formatMarketArr } from "@/utils/markets/formatMarketArr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DesktopCardSectionSkelleton, MarketCard } from "./MarketCard";
import { PaginationDots } from "./CarouselDotButton";
import { Skeleton } from "@/components/ui/Skeleton";

export function FeaturedMarketsSection({ markets, topic }) {
  const enrichedFeedData = formatMarketArr({
    markets,
    selectedTopic: "🔥 Trending",
  });

  const isTwoCards = typeof window !== "undefined" && window.innerWidth < 1024;

  const skeletonCount =
    24 - enrichedFeedData.length > 0 ? 24 - enrichedFeedData.length : 0;

  const adjustedAmount = {
    base: 2,
    xl: Math.min(3, 3),
    "2xl": 5,
  };

  return (
    <div className="flex flex-col w-full -mb-3">
      {!topic && (
        <div className="text-[1.8rem] text-white font-semibold mb-7 space-x-2">
          Trending Today
        </div>
      )}
      <Carousel>
        <CarouselContent className="flex flex-row space-x-2.5 lg:space-x-0.5  w-full">
          {enrichedFeedData.map((item, index) => (
            <CarouselItem key={index} className="basis-1/2 w-1/2 lg:basis-1/5  lg:w-1/5">
              <MarketCard
                item={item}
                isTwoCards={isTwoCards}
                loading={!enrichedFeedData}
                amount={adjustedAmount}
              />
            </CarouselItem>
          ))}

          {/* Render skeletons if needed */}
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <CarouselItem
              key={`skeleton-${index}`}
              className="basis-1/2 w-1/2 lg:basis-1/4 lg:w-1/4"
            >
              <DesktopCardSectionSkelleton
                item={index}
                isTwoCards={isTwoCards}
                loading={false}
                amount={adjustedAmount}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <PaginationDots />
      </Carousel>
    </div>
  );
}
