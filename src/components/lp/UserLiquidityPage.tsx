// @ts-nocheck
import { useRouter } from "next/router"
import { useUserStore } from "@/lib/stores/UserStore"
import { LiquidityPosition } from "./LiquidityPosition"
import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { NewPlaceholderLp } from "@/components/common/placeholders/NewPlaceholders"
import { useGetLpPositionsByUser } from "@/graphql/queries/liquidity/useGetLpPositionsByUser"

export function UserLiquidityPage() {
  const router = useRouter()
  const { user } = useUserStore()
  const {
    data: positions,
    loading,
    refetch,
  } = useGetLpPositionsByUser(user?.walletAddress)

  const filteredPositions = positions?.filter((item) => item.amount > 0) ?? []
  console.log("llp", positions)
  return (
    <div className="pt-16 flex flex-col h-full min-h-screen bg-[#101010] w-full px-5">
      <div className="flex flex-row items-center my-4 justify-between">
        <motion.button
          onClick={() => {
            router.back()
          }}
          className={`
            size-[30px] bg-[rgba(100,100,100,0.4)] rounded-full
            flex justify-center items-center z-4 border-none cursor-pointer
          `}
        >
          <ChevronLeft height={21} color={"white"} strokeWidth={4} />
        </motion.button>
        <span className="text-white text-[23px] font-semibold">
          Your Boosts
        </span>
        <div className="w-5" />
      </div>
      {filteredPositions?.length > 0 ? (
        <div className="pb-5">
          {filteredPositions.map((item, index: number) => (
            <LiquidityPosition
              refetch={refetch}
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
  )
}
