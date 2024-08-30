// @ts-nocheck

import React, { useEffect } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { useGetMarketsCreatedByUser } from "@/supabase/queries/useGetMarketsCreatedByUser";

import { aggregatePredictedItems } from "@/utils/predictions/aggregatePredictions";

import { NewPlaceholder } from "../../common/placeholders/NewPlaceholders";
import { PredictionPositionModal } from "../../modals/PredictionPositionModal";

import { UserPrediction, CreatedPrediction } from "./UserPrediction";
import { UserPredictionSkeleton } from "./UserPredictionSkeleton";
import { useGetPositionsByWallet } from "@/graphql/queries/positions/useGetPositionsByWallet";

export function GeneralFeed({ walletAddy, id, onParentRefresh }) {
  const { user } = useUserStore();
  const walletAddress = walletAddy || user?.walletAddress;
  const userId = id || user?.externalAuthProviderUserId;

  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = useGetPositionsByWallet(walletAddress);
  const {
    data: createdMarketsData,
    isLoading: isCreatedMarketsLoading,
    refetch: refetchCreated,
  } = useGetMarketsCreatedByUser(userId);

  useEffect(() => {
    if (onParentRefresh) {
      refetchOrders();
      refetchCreated();
    }
  }, [onParentRefresh, refetchOrders, refetchCreated]);
  console.log("user55", ordersData, createdMarketsData);

  if (isOrdersLoading || isCreatedMarketsLoading) {
    return (
      <div className="flex flex-col px-4 items-center">
        <UserPredictionSkeleton index={0} />
        <UserPredictionSkeleton index={1} />
      </div>
    );
  }

  const aggregatedOrdersData = aggregatePredictedItems(ordersData || []);
  const mergedData = [
    ...aggregatedOrdersData.map((item) => ({ ...item, type: "predicted" })),
    ...(createdMarketsData?.map((item) => ({ ...item, type: "created" })) ||
      []),
  ];

  return (
    <div className="flex flex-col items-center">
      {mergedData.length < 1 ? (
        <NewPlaceholder
          isUser={userId === user?.external_auth_provider_user_id}
        />
      ) : (
        mergedData.map((item, index) =>
          item.type === "predicted" ? (
            <PredictionPositionModal
              key={`predicted-${item.id}-${item.option}`}
              title={item.title}
              image={item.image}
              price={item.amount}
              ownedAmount={item.amount / 100000}
              options={item.options}
              percentage={item.percentage}
              betId={item.market_id}
              topic={item.market_id}
              icon={item.icon}
              question={item.question}
              option={item.option}
              optionNumber={item.optionNumber}
              isExternal={item.isExternal}
            >
              <UserPrediction
                key={`predicted-${item.id}-${item.option}`}
                option={
                  item.option === 0
                    ? item.options[item.option + 1]?.name
                    : item.options[item.option - 1]?.name
                }
                betId={item?.market_id}
                optional={item?.option}
                index={index}
                title={item?.title}
                question={item?.question}
                image={item?.image}
                amount={String(item?.amount / 100000)}
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
  );
}
