// @ts-nocheck

import React, { useEffect } from "react"
import { useUserStore } from "@/lib/stores/UserStore"

import {
  aggregatePredictedItems,
  aggregatePredictedItemsWithImage,
} from "@/utils/predictions/aggregatePredictions"

import { NewPlaceholder } from "../../common/placeholders/NewPlaceholders"
import { PredictionPositionModal } from "../../modals/PredictionPositionModal"

import { UserPrediction, CreatedPrediction } from "./UserPrediction"
import { UserPredictionSkeleton } from "./UserPredictionSkeleton"
import { useGetPositionsByWallet } from "@/graphql/queries/positions/useGetPositionsByWallet"
import { useGetCreatedMarketsByUser } from "@/graphql/queries/markets/useGetCreatedMarketsByUser"
import { HARD_MARKETS } from "@/constants/markets"
import { enhanceMarketsWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId"
import { HARD_TOPICS } from "@/constants/topics"

export function GeneralFeed({ walletAddy, id, onParentRefresh }) {
  const { user } = useUserStore()
  const walletAddress = walletAddy || user?.walletAddress
  const userId = id || user?.externalAuthProviderUserId

  const {
    orders: ordersData,
    loading: isOrdersLoading,
    refetch: refetchOrders,
  } = useGetPositionsByWallet(walletAddress)
  const {
    markets: createdMarketsData,
    loading: isCreatedMarketsLoading,
    refetch: refetchCreated,
  } = useGetCreatedMarketsByUser(walletAddress)

  useEffect(() => {
    if (onParentRefresh) {
      refetchOrders()
      refetchCreated()
    }
  }, [onParentRefresh, refetchOrders, refetchCreated])

  if (isOrdersLoading || isCreatedMarketsLoading) {
    return (
      <div className="flex flex-col px-4 items-center">
        <UserPredictionSkeleton index={0} />
        <UserPredictionSkeleton index={1} />
      </div>
    )
  }

  const aggregatedOrdersData = aggregatePredictedItemsWithImage(
    ordersData || [],
    HARD_MARKETS
  )

  const enhancedCreatedMarket = enhanceMarketsWithImageAndPolyId(
    createdMarketsData,
    HARD_MARKETS,
    HARD_TOPICS
  )
  const mergedData = [
    ...aggregatedOrdersData.map((item) => ({ ...item, type: "predicted" })),
    ...(createdMarketsData?.map((item) => ({ ...item, type: "created" })) ||
      []),
  ]

  console.log("aggrea", mergedData)
  return (
    <div className="flex flex-col items-center -gap-2.5 -mt-3">
      {mergedData.length < 1 ? (
        <NewPlaceholder isUser={userId === user?.externalAuthProviderUserId} />
      ) : (
        mergedData.map((item, index) =>
          item.type === "predicted" ? (
            <PredictionPositionModal
              key={`predicted-${item.id}-${item.option}-${item?.outcomeOddsB}`}
              title={item.market?.title}
              image={item?.image}
              price={item.tokensOwned}
              ownedAmount={Number(item.tokensOwned)}
              options={
                item.option === 1
                  ? {
                      name: item?.market?.outcomeA,
                      odds: item?.market?.outcomeOddsA,
                    }
                  : {
                      name: item?.market?.outcomeB,
                      odds: item?.market?.outcomeOddsB,
                    }
              }
              percentage={item.percentage}
              betId={item.marketId}
              topic={item.marketId}
              initialProb={item?.market?.initialProb / 100}
              icon={item.icon}
              question={item.market?.question}
              option={item.option}
              optionNumber={item.option}
              isExternal={false}
            >
              <UserPrediction
                key={`predicted-${item.marketId}-${item.option}`}
                option={
                  item.option === 0
                    ? item?.market?.outcomeB
                    : item?.market?.outcomeA
                }
                betId={item?.marketId}
                optional={item?.option}
                index={index}
                title={item.market?.title}
                question={item?.market?.question}
                image={item?.image}
                amount={String(item?.tokensOwned / 100000)}
              />
            </PredictionPositionModal>
          ) : (
            <CreatedPrediction
              key={`created-${item.id}`}
              index={index}
              id={item.id}
              item={item}
              title={item.title}
              question={item.question}
              image={item.image}
              amount={item.amount}
            />
          )
        )
      )}
    </div>
  )
}
