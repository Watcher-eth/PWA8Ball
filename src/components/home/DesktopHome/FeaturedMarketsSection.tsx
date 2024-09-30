import { formatMarketArr } from "@/utils/markets/formatMarketArr"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { MarketCard } from "./MarketCard"
import { PaginationDots } from "./CarouselDotButton"
import { Skeleton } from "@/components/ui/Skeleton"

export function FeaturedMarketsSection({ markets, topic }) {
  const enrichedFeedData = formatMarketArr({
    markets,
    selectedTopic: "🔥 Trending",
  })

  // Determine the number of skeletons needed if fewer items are available
  const skeletonCount = 24 - enrichedFeedData.length > 0 ? 24 - enrichedFeedData.length : 0

  return (
    <div className="flex flex-col w-full">
      {!topic && (
        <div className="text-[1.8rem] text-white font-[600] mb-7 space-x-2">
          Trending Today
        </div>
      )}
      <Carousel>
        <CarouselContent className="flex flex-row space-x-3.5 w-full">
          {/* Render market items */}
          {enrichedFeedData.map((item, index) => (
            <CarouselItem key={index} className="basis-1/2 w-1/2">
              <MarketCard item={item} isTwoCards={true} loading={false} />
            </CarouselItem>
          ))}

          {/* Render skeletons if needed */}
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <CarouselItem key={`skeleton-${index}`} className="basis-1/2 w-1/2">
              <div className="flex flex-col  w-full relative">
                <Skeleton className="h-[29vw] w-full object-cover rounded-lg border-[0.08rem] border-[#303030]/25 shadow-md shadow-[#101010]" />
                <Skeleton className="px-9 py-3.5 absolute z-20 border-[0.09rem] border-white/5 rounded-full bg-[#353535]/20 backdrop-blur-md text-sm top-5 right-5 h-[1.5rem] w-[3rem]" />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col mt-5">
                    <Skeleton className="h-[1.4rem] w-[80%]" />
                    <Skeleton className="mt-3 h-[1.1rem] w-[23vw]" />
                  </div>
                </div>
                <Skeleton className="text-[gray] mt-2 h-[0.9rem] w-[15%]" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <PaginationDots />
      </Carousel>
    </div>
  )
}
