import Link from "next/link";
import { getMarketPath } from "@/utils/urls";
import { Skeleton } from "@/components/ui/Skeleton";
import { DEFAULT_PFP_PLACEHOLDER } from "@/constants/testData";

export function MarketCard({
  item,
  isTwoCards,
  loading = false,
  amount,
}: {
  item: any;
  isTwoCards: boolean;
  loading?: boolean;
  amount: { base: number; xl: number; "2xl": number }; // Adjusted to accept an amount object
}) {
  const baseAmount = amount?.base || 2;
  const xlAmount = amount?.xl || baseAmount;
  const twoXlAmount = amount?.["2xl"] || xlAmount;

  const heightClass = isTwoCards
    ? "h-[29vw]"
    : amount["2xl"] >= 5
    ? "min-h-[20vw] h-[20vw] xl:h-[14vw] xl:min-h-[14vw]"
    : amount["2xl"] >= 4 || amount["xl"] >= 4
    ? "min-h-[21vw] h-[21vw] xl:h-[16vw] xl:min-h-[16.5vw]"
    : amount["2xl"] >= 4
    ? "min-h-[21vw] h-[21vw] xl:h-[6vw] xl:min-h-[6.5vw]"
    : "min-h-[21vw] h-[21vw] xl:h-[15vw] xl:min-h-[15.5vw]";

  if (!item) {
    return (
      <DesktopCardSectionSkelleton
        item={item}
        isTwoCards={isTwoCards}
        loading={false}
        amount={amount}
      />
    );
  }
  console.log(twoXlAmount, xlAmount, item?.title);
  return (
    <Link
      href={getMarketPath(item?.marketId)}
      className={`flex flex-col w-full relative hover:scale-[100.1%] active:scale-[99.5%]`}
    >
      <img
        className={`${heightClass} w-full object-cover rounded-lg border-[0.08rem] border-[#303030]/25 shadow-md shadow-[#101010] hover:shadow-[#171717]`}
        src={item?.image ? item?.image : DEFAULT_PFP_PLACEHOLDER}
        alt={item?.title}
      />

      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col mt-3 w-full">
          <div className="flex items-center w-full justify-between">
            <div
              className={`text-white  ${
                twoXlAmount > 3 ? "text-[1.3rem]" : "text-[1.2rem] lg:text-[1.6rem]"
              } font-[Aeonik-Bold]`}
            >
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
          <div className="text-[lightgray] max-w-[100%] text-[1.1rem] font-[Aeonik]">
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

export function DesktopCardSectionSkelleton({
  item,
  isTwoCards,
  loading = false,
  amount,
}: {
  item: any;
  isTwoCards: boolean;
  loading?: boolean;
  amount: { base: number; xl: number; "2xl": number };
}) {
  const baseAmount = amount?.base || 2;

  const xlAmount = amount?.xl || baseAmount;
  const twoXlAmount = amount?.["2xl"] || xlAmount;
  const heightClass = isTwoCards
    ? "h-[29vw]"
    : amount["2xl"] >= 5
    ? "min-h-[20vw] h-[20vw] xl:h-[14vw] xl:min-h-[14vw]"
    : amount["2xl"] >= 4 || amount["xl"] >= 4
    ? "min-h-[21vw] h-[21vw] xl:h-[18vw] xl:min-h-[18.5vw]"
    : amount["2xl"] >= 4
    ? "min-h-[21vw] h-[21vw] xl:h-[6vw] xl:min-h-[6.5vw]"
    : "min-h-[25vw] h-[23vw] xl:h-[19vw] xl:min-h-[19.5vw]";
  return (
    <div className={`flex flex-col my-0 w-full relative`}>
      <Skeleton
        className={`${heightClass} w-full object-cover rounded-lg border-[0.08rem] border-[#303030]/25 shadow-md shadow-[#101010]`}
      />
      <Skeleton
        className={`px-9 py-3.5 absolute z-20 border-[0.09rem] border-white/5 rounded-full bg-[#353535]/20 backdrop-blur-md ${
          isTwoCards
            ? "text-sm top-5 right-5 h-[1.5rem] w-[3rem] "
            : "text-[0.8rem] top-4 right-4 h-[1.4rem] w-[3rem]"
        }`}
      />
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-col mt-3 w-full">
          <Skeleton className="h-[1.4rem] mt-2 w-[80%] xl:w-[60%]" />
          <Skeleton className="mt-3.5 mb-1 h-[1.1rem] w-[23vw] xl:w-[80%]" />
        </div>
        {isTwoCards && (
          <Skeleton className="py-1 px-3.5 pr-1.5 rounded-full bg-[#181818] h-[2.2rem] w-[6.5rem] mt-4" />
        )}
      </div>
      <Skeleton className="text-[gray] mt-2 h-[0.9rem] w-[15%]" />
    </div>
  );
}
