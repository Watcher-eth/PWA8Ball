import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MarketCard } from "./MarketCard";
import { PaginationDots } from "./CarouselDotButton";
import { Skeleton } from "@/components/ui/Skeleton";

export function DesktopHomeNews({ markets, amount, topic }) {
  const adjustedAmount = {
    base: amount,
    "2xl": amount === 4 ? 5 : amount === 2 ? 4 : amount,
    xl: amount === 4 ? 5 : amount === 2 ? 4 : amount,
  };

  const skeletonCount =
    Math.max(
      adjustedAmount["2xl"], // Use the largest amount (e.g., for 2xl screens)
      adjustedAmount["xl"],
      adjustedAmount["base"]
    ) - markets.length;

  return (
    <div className="w-full flex flex-col">
      {!topic && (
        <div className="text-[1.8rem] text-white font-semibold flex flex-row items-center space-x-2">
          {amount === 4 && (
            <img src={"../images/OrbLogo.png"} className="h-10 w-10" />
          )}
          <div>{amount === 4 ? "Breaking News" : "New Predictions"}</div>
        </div>
      )}
      <div
        className={`flex flex-row items-center space-x-3 ${
          topic === true && "-mt-10"
        }`}
      >
        <Carousel className="flex flex-col no-scrollbar mb-8 w-full gap-2 overflow-y-visible">
          <CarouselContent className="flex flex-row no-scrollbar w-full gap-1 py-6 overflow-y-visible">
            {markets &&
              markets.slice(0, adjustedAmount["base"]).map((item, index) => (
                <CarouselItem
                  key={index}
                  className={`${
                    adjustedAmount["2xl"] === 5 || adjustedAmount["2xl"] === 4
                      ? "basis-1/5 w-1/5"
                      : adjustedAmount["base"] === 3
                      ? "basis-1/3 w-1/3"
                      : "basis-1/2 w-1/2"
                  }`}
                >
                  <MarketCard
                    loading={false}
                    key={index}
                    item={item}
                    amount={adjustedAmount}
                    isTwoCards={adjustedAmount["base"] === 2}
                  />
                </CarouselItem>
              ))}
            {Array.from({ length: skeletonCount }, (_, index) => (
              <CarouselItem
                key={`skeleton-${index}`}
                className={`${
                  adjustedAmount["2xl"] === 5 || adjustedAmount["2xl"] === 4
                    ? "basis-1/5 w-1/5"
                    : adjustedAmount["base"] === 3
                    ? "basis-1/3 w-1/3"
                    : "basis-1/2 w-1/2"
                }`}
              >
                <div className="flex flex-col w-full relative">
                  <Skeleton
                    className={`${
                      adjustedAmount["2xl"] >= 4 ? "h-[18vw]" : "h-[21vw]"
                    } w-full object-cover rounded-lg border-[0.08rem] border-[#303030]/25 shadow-md shadow-[#101010]`}
                  />
                  <Skeleton
                    className={`px-9 py-3.5 absolute z-20 border-[0.09rem] border-white/5 rounded-full bg-[#353535]/20 backdrop-blur-md ${
                      adjustedAmount["base"] === 2
                        ? "text-sm top-5 right-5 h-[1.5rem] w-[3rem]"
                        : "text-[0.8rem] top-4 right-4 h-[1.4rem] w-[3rem]"
                    }`}
                  />
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col mt-6">
                      <Skeleton className="h-[1.4rem] w-[80%]" />
                      <Skeleton className="mt-3 h-[1.1rem] w-[23vw]" />
                    </div>
                    {adjustedAmount["base"] === 2 && (
                      <Skeleton className="py-1 px-3.5 pr-1.5 rounded-full bg-[#181818] h-[2.2rem] w-[6.5rem] mt-4" />
                    )}
                  </div>
                  <Skeleton className="text-[gray] mt-2 h-[0.9rem] w-[15%]" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <PaginationDots />
        </Carousel>
      </div>
    </div>
  );
}
