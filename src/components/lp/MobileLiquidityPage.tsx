// @ts-nocheck

import { useRouter } from "next/router";
import { useUserStore } from "@/lib/stores/UserStore";
import { LiquidityPosition } from "./LiquidityPosition";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { NewPlaceholderLp } from "@/components/common/placeholders/NewPlaceholders";
import { enhancePositionsWithImages } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { useGetUserLp } from "@/graphql/queries/liquidity/useGetUserLp";
import { HARD_MARKETS } from "@/constants/markets";
export function MobileLiquidityPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const { data: lpPositions, refetch } = useGetUserLp(user?.walletAddress);

  const filteredPositions =
    enhancePositionsWithImages(
      lpPositions?.filter((item) => item.amountUsdc > 0),
      HARD_MARKETS
    ) ?? [];

  return (
    <div className="pt-4 flex flex-col  min-h-screen bg-[#101010] w-full px-5">
      <div className="flex flex-row items-center justify-between my-[18px]">
        <motion.button
          onClick={() => router.back()}
          className="size-[30px] bg-[rgba(100,100,100,0.4)] rounded-full flex justify-center items-center z-4 border-none cursor-pointer"
        >
          <ChevronLeft height={21} color="white" strokeWidth={4} />
        </motion.button>
        <span className="text-white text-[23px] font-semibold">
          Your Boosts
        </span>
        <div className="w-5" />
      </div>
      {filteredPositions?.length > 0 ? (
        <div className="pb-5 w-full">
          {filteredPositions.map((item, index: number) => (
            <div className="w-full mx-5 ">
              <LiquidityPosition
                refetch={refetch}
                key={index}
                amount={Number(item.amountUsdc) / 10 ** 6}
                image={item.image}
                title={item.market?.title}
                id={item.marketId}
                amountLp={item?.amountLp}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-y-scroll">
          <NewPlaceholderLp isUser={true} />
        </div>
      )}
    </div>
  );
}
