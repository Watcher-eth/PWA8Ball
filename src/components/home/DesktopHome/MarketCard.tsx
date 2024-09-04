import Link from "next/link";
import { Stars } from "lucide-react";
import { getMarketPath } from "@/utils/urls";
import { Skeleton } from "@/components/ui/Skeleton"; // Assuming you have a Skeleton component

export function MarketCard({
  item,
  isTwoCards,
  loading = false,
}: {
  item: any;
  isTwoCards: boolean;
  loading?: boolean;
}) {
  console.log("item", item);
  if (!item) {
    return (
      <div className={`flex flex-col my-3 w-full relative`}>
        {/* Image Skeleton */}
        <Skeleton
          className={`${
            isTwoCards ? "h-[29vw]" : "min-h-[21vw] h-[21vw]"
          } w-full object-cover rounded-lg border-[0.08rem] border-[#303030]/25 shadow-md shadow-[#101010]`}
        />
        {/* Odds Skeleton */}
        <Skeleton
          className={`px-9 py-3.5 absolute z-20 border-[0.09rem] border-white/5 rounded-full bg-[#353535]/20 backdrop-blur-md ${
            isTwoCards
              ? "text-sm top-5 right-5 h-[1.5rem] w-[3rem]"
              : "text-[0.8rem] top-4 right-4 h-[1.4rem] w-[3rem]"
          }`}
        />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col mt-3">
            {/* Title Skeleton */}
            <Skeleton className="h-[1.4rem] w-[80%]" />
            {/* Question Skeleton */}
            <Skeleton className="mt-2 h-[1.1rem] w-[23vw] " />
          </div>
          {isTwoCards && (
            <Skeleton className="py-1 px-3.5 pr-1.5 rounded-full bg-[#181818] h-[2.2rem] w-[6.5rem] mt-4" />
          )}
        </div>
        {/* Stake Skeleton */}
        <Skeleton className="text-[gray] mt-2 h-[0.9rem] w-[15%]" />
      </div>
    );
  }

  return (
    <Link
      href={getMarketPath(item?.marketId)}
      className={`flex flex-col w-full relative hover:scale-[100.4%] active:scale-99`}
    >
      <img
        className={`${
          isTwoCards ? "h-[29vw]" : "min-h-[21vw] h-[21vw]"
        } w-full object-cover rounded-lg border-[0.08rem] border-[#303030]/25 shadow-md shadow-[#101010] hover:shadow-[#171717]`}
        src={item?.image}
        alt={item?.title}
      />

      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col mt-3 w-full">
          <div className="flex items-center w-full justify-between">
            <div className="text-white text-[1.6rem] font-semibold">
              {item?.title}
            </div>
            <div
              className={`px-2.5 py-1 z-20 border-[0.09rem] border-white/5 rounded-full bg-[#353535]/20 backdrop-blur-md text-white ${
                isTwoCards ? "text-sm " : "text-[0.8rem]  "
              } font-semibold`}
            >
              {(item?.outcomeOddsA / 100).toFixed(1)}%{" "}
              {item?.outcomeA === "Yes" ? "Chance" : item?.outcomeA}
            </div>
          </div>
          <div className="text-[lightgray] max-w-[100%] text-[1.1rem] font-normal">
            {item?.question}
          </div>
        </div>
      </div>
      <div className="text-[gray] mt-2 text-sm font-normal">
        ${Number(item?.usdcStake / 10 ** 6).toFixed(2)} at stake
      </div>
    </Link>
  );
}
