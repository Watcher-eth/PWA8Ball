
import { Skeleton } from "@/components/ui/Skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MarketCard } from "./MarketCard";




export function DesktopHomeNews({ markets, amount }) {
  return (
    <div className="w-full flex flex-col">
      <div className="text-[2rem] text-white font-[500] flex flex-row items-center space-x-2">
        {amount === 4 && (
          <img src={"../images/OrbLogo.png"} className="h-11 w-11" />
        )}
        <div className="">
          {amount === 4 ? "Breaking News" : "New Predictions"}
        </div>
      </div>
      <div className="flex flex-row items-center space-x-3">
        <Carousel className="flex flex-row overflow-x-auto no-scrollbar mb-7 w-full gap-6 py-6 overflow-y-visible">
          <CarouselContent>
            {markets
              ? markets?.map((item, index) => {
                  if (
                    (amount === 4 && index > 0 && index < 9) ||
                    (amount === 3 && index > 4)
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
        </Carousel>
      </div>
    </div>
  );
}
