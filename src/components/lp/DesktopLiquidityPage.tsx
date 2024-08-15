// @ts-nocheck

import { useRouter } from "next/router";
import { useUserStore } from "@/lib/stores/UserStore";

import { useGetUserLp } from "@/graphql/queries/liquidity/useGetUserLp";
import { Card } from "@/components/ui/tailwind/Card";
import { StandardPageWrapper } from "@/components/layouts/StandardPageWrapper";
import { NewPlaceholderLp } from "@/components/common/placeholders/NewPlaceholders";

import { DesktopLiquidityPosition } from "./LiquidityPosition";
import { DesktopLpChart } from "./DesktopLpChart";

export function DesktopLiquidityPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const {
    data: positions,
    loading: isLoading,
    error,
  } = useGetUserLp("0x9fEFD0Bb2d175B039C8c72C55eEa11BC66452591");

  const filteredPositions = positions?.filter((item) => item.amount > 0) ?? [];
  const totalAmount = filteredPositions.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  console.log("pos", positions);
  return (
    <StandardPageWrapper>
      <div className="pt-10 flex flex-col h-full min-h-screen bg-[#080808] w-full ">
        <div className="flex flex-col -space-y-3 px-10">
          <div className="flex flex-row items-baseline">
            <div className="text-white text-[3.5rem] font-semibold font-[Aeonik-Bold]">
              ${(totalAmount / 1000000).toFixed(2)}
            </div>
            <div className="text-[lightgray] text-2xl ml-2 mb-3  font-[Aeonik]">
              +12.5%
            </div>
          </div>
          <div className="text-[lightgray] text-xl  font-[Aeonik]">
            Your cummulative boosts
          </div>
        </div>
        <div className="h-[30%]">
          <div className="border-0 border-[transparent] h-[35vh] mx-10 my-10 ">
            <DesktopLpChart />
          </div>
        </div>
        <div className="text-[white] text-2xl  mb-4  px-10 font-[Aeonik-Bold]">
          Your Boosts
        </div>
        <div className="px-10">
          {filteredPositions?.length > 0 ? (
            <div className="pb-5 grid-cols-3 row-span-3 grid grid-flow-col gap-4">
              {filteredPositions.map((item, index: number) => (
                <DesktopLiquidityPosition
                  key={index}
                  amount={item.amount / 10 ** 6}
                  image={item.image}
                  title={item.title}
                  id={item.marketId}
                />
              ))}
            </div>
          ) : (
            <div className="overflow-y-scroll">
              <NewPlaceholderLp isUser={true} />
            </div>
          )}
        </div>
      </div>
    </StandardPageWrapper>
  );
}
