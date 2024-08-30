
import Link from "next/link";

import { Stars } from "lucide-react";

import { getMarketPath } from "@/utils/urls";

export function MarketCard({
  item,
  isTwoCards,
}: {
  item: any;
  isTwoCards: boolean;
}) {
  return (
    <Link
      href={getMarketPath(item?.marketId)}
      className={`flex flex-col w-full relative hover:scale-[100.4%] active:scale-99 `}
    >
      <img
        className={`${
          isTwoCards ? "h-[29vw]" : "h-[21vw]"
        } w-full object-cover rounded-lg border-[0.08rem] border-[#303030]/25 shadow-md shadow-[#101010] hover:shadow-[#171717]`}
        src={item?.image}
        alt={item?.title}
      />
      <div
        className={`px-2.5 py-1 absolute z-[20] border-[0.09rem] border-[#efefef]/10 rounded-full bg-[#353535]/20 backdrop-blur-md text-white ${
          isTwoCards
            ? "text-[0.9rem] top-5 right-5 "
            : "text-[0.8rem] top-4 right-4 "
        } font-semibold`}
      >
        {(item?.outcomeOddsA / 100).toFixed(1)}%{" "}
        {item?.outcomeA === "Yes" ? "Chance" : item?.outcomeA}
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col mt-3">
          <div className="text-white text-[1.6rem] font-semibold">
            {item?.title}
          </div>
          <div className="text-[lightgray] max-w-[100%] text-[1.1rem] font-normal">
            {item?.question}
          </div>
        </div>
        {isTwoCards && (
          <div className="py-1 px-3.5 pr-1.5 rounded-full bg-[#181818] text-white flex items-center flex-row space-x-0.5 self-start mt-4">
            <div className="text-[1rem] font-[500]">Predict</div>
            <Stars height={"0.9rem"} color="white" strokeWidth={2.8} />
          </div>
        )}
      </div>
      <div className="text-[gray] mt-2 text-[0.9rem] font-normal">
        ${Number(item?.usdcStake / 10 ** 6).toFixed(2)} at stake
      </div>
    </Link>
  );
}
