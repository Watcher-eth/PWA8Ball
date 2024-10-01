import { StarHalf } from "lucide-react"

import { RelatedMarketQuestion } from "./RelatedMarketQuestion"
import { useGetRelatedMarkets } from "@/supabase/queries/reccomendations/useGetRelatedMarkets"


export function RelatedMarkets({
  topicId,
  id,
  isDesktop=false,
}: {
  topicId: string
  id: number
  isDesktop?: boolean
}) {
  // Get Markets from topic
  const { data: markets } = useGetRelatedMarkets(topicId)

  return (
    markets && (markets?.length >= 2) && (
      <div
        className={`
          flex flex-col z-20
          ${isDesktop ? "bg-transparent" : "bg-[#101010] p-4 pt-6"}
        `}
      >
        <div className="pb-3 flex flex-row items-center">
          <StarHalf color={"white"} strokeWidth={2.8} />
          <span className="text-lg text-white font-semibold">
            Related Predictions
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {markets
            ?.filter((item) => item.id !== id)
            ?.slice(0, 4)
            ?.map((item, index) => {
              return (
                //@ts-ignore
                <RelatedMarketQuestion
                  isDesktop={isDesktop}
                  {...item}
                  key={index}
                />
              )
            })}
        </div>
        <div className="h-20" />
      </div>
    )
  )
}
