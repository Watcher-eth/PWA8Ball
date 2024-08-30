
import { formatMarketArr } from "@/utils/markets/formatMarketArr";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "@/components/layouts/StandardBleedOverlay";
import Countdown from "@/components/common/CountDown";
import { ElectionndDate } from "@/components/topic/ElectionPage";

import { MarketCard } from "./MarketCard";
import { DesktopFooter } from "./DesktopFooter";



export function ElectionFooter({ markets }) {
  const enrichedFeedData = formatMarketArr({
    markets,
    selectedTopic: "🇺🇸 2024 US Elections",
  });

  return (
    <div className="px-4 mt-[6.5rem] flex flex-col w-full">
      <div className="flex flex-col w-full px-14">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-0 mb-3">
            <div className="text-[1.9rem] text-white font-[Aeonik-Bold] space-x-2">
              🇺🇸 2024 US Elections
            </div>
            <div className="text-[1.05rem] text-[lightgray] font-normal flex flex-col space-x-2">
              Get the latest forecasts about the 2024 US Federal Elections
            </div>
          </div>{" "}
          <Countdown endDate={ElectionndDate} />
        </div>
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className="flex flex-row overflow-x-auto no-scrollbar mb-7 w-full gap-6 py-6 overflow-y-visible"
        >
          {enrichedFeedData
            ? enrichedFeedData?.map((item, index) => {
                if (index < 3)
                  return (
                    <MarketCard key={index} item={item} isTwoCards={false} />
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
        </motion.div>
        <div className="text-[1.7rem] text-white font-[Aeonik-Bold] space-x-2">
          Latest News
        </div>
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className="flex flex-row overflow-x-auto no-scrollbar mb-40 w-full gap-6 py-6 overflow-y-visible"
        >
          {enrichedFeedData
            ? enrichedFeedData?.map((item, index) => {
                if (index > 3 && index < 6)
                  return (
                    <MarketCard key={index} item={item} isTwoCards={true} />
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
        </motion.div>
        <StandardBleedOverlay>
          <InverseVerticalBleedOverlay>
            <DesktopFooter />
          </InverseVerticalBleedOverlay>
        </StandardBleedOverlay>
      </div>
    </div>
  );
}





