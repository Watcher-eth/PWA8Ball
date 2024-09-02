import { Skeleton } from "@/components/ui/Skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MarketCard } from "./MarketCard";
import PaginationDots from "./CarouselDotButton";

export function DesktopHomeNews({ markets, amount, topic }) {
  return (
    <div className="w-full flex flex-col">
      {!topic && (
        <div className="text-[2rem] text-white font-[500] flex flex-row items-center space-x-2">
          {amount === 4 && (
            <img src={"../images/OrbLogo.png"} className="h-11 w-11" />
          )}
          <div className="">
            {amount === 4 ? "Breaking News" : "New Predictions"}
          </div>
        </div>
      )}
      <div
        className={`flex flex-row items-center space-x-3 ${
          topic === true && "-mt-10"
        }`}
      >
        <Carousel className="flex flex-col  no-scrollbar mb-10 w-full gap-2   overflow-y-visible">
          <CarouselContent className="flex flex-row  no-scrollbar  w-full gap-1 py-6  overflow-y-visible">
            {markets
              ? markets?.map((item, index) => {
                  if (
                    (amount === 4 && index > 0 && index < 9) ||
                    (amount === 3 && index > 10)
                  )
                    return (
                      <CarouselItem
                        className={`${
                          amount === 4 ? "basis-1/4 w-1/4" : "basis-1/3 w-1/3"
                        }`}
                      >
                        <MarketCard
                          key={index}
                          item={item}
                          isTwoCards={false}
                        />
                      </CarouselItem>
                    );
                })
              : [1, 2, 3, 4, 5, 6].map((index) => (
                  <div
                    className={`self-center ${index === 0 ? "mt-6" : "mt-2"}`}
                    key={index}
                  >
                    <Skeleton className="rounded-lg w-[88vw] max-w-[23.5rem] md:max-w-[21.5rem] lg:max-w-[21.5rem] max-h-[27rem] h-[107vw]" />
                  </div>
                ))}
          </CarouselContent>
          <PaginationDots />
        </Carousel>
      </div>
    </div>
  );
}
