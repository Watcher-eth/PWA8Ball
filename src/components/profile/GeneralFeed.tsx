// @ts-nocheck

import React, { useEffect } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import {
  UserPredictions,
  CreatedPrediction,
  UserPredictionSkeleton,
} from "./UserPredictions";
import { useQueryClient } from "@tanstack/react-query";
import { useGetOrdersForUser } from "@/lib/supabase/queries/user/getUserOrders";
import { useGetMarketsCreatedByUser } from "@/lib/supabase/queries/getUserCreatedMarkets";
import { NewPlaceholder } from "../Common/Placeholders/NewPlaceholders";
import { BetModal } from "../Modals/MyBetModal.tsx";
const aggregatePredictedItems = (orders: any) => {
  const aggregated = {};

  orders.forEach((item: any) => {
    const key = `${item.market_id}-${item.option}`;
    if (aggregated[key]) {
      aggregated[key].amount += item.amount;
    } else {
      aggregated[key] = { ...item };
    }
  });

  return Object.values(aggregated);
};

export const GeneralFeed = ({
  handleOpenBottomSheet,
  walletAddy,
  id,
  onParentRefresh,
}) => {
  const { user } = useUserStore();

  const walletAddress = walletAddy || user?.walletaddress;
  const userId = id || user?.external_auth_provider_user_id;

  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = useGetOrdersForUser(walletAddress);
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

  if (isOrdersLoading || isCreatedMarketsLoading) {
    return (
      <div className="flex flex-col items-center">
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
    <div className="flex flex-col gap-[-0.1rem] items-center">
      {mergedData.length < 1 ? (
        <NewPlaceholder
          isUser={userId === user?.external_auth_provider_user_id}
        />
      ) : (
        mergedData.map((item, index) =>
          item.type === "predicted" ? (
            <BetModal
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
              onClose={() => handleOpenBottomSheet({})}
              openCashout={() => handleOpenBottomSheet({})}
              handleReceipt={() => handleOpenBottomSheet({})}
            >
              <UserPredictions
                key={`predicted-${item.id}-${item.option}`}
                onOpenBottomSheet={() =>
                  handleOpenBottomSheet({
                    amount: item.amount / 100000,
                    title: item.title,
                    image: item.image,
                    price: item.amount,
                    question: item.question,
                    betId: item.market_id,
                    topic: item.market_id,
                    option:
                      item.option === 0
                        ? item.options[item.option + 1].name
                        : item.options[item.option - 1].name,
                  })
                }
                option={
                  item.option === 0
                    ? item.options[item.option + 1].name
                    : item.options[item.option - 1].name
                }
                betId={item.market_id}
                optional={item.option}
                index={index}
                title={item.title}
                question={item.question}
                image={item.image}
                amount={String(item.amount / 100000)}
              />
            </BetModal>
          ) : (
            <CreatedPrediction
              key={`created-${item.id}`}
              onOpenBottomSheet={() =>
                handleOpenBottomSheet({
                  amount: item.amount,
                  title: item.title,
                  image: item.image,
                  price: item.amount,
                  question: item.question,
                  betId: item.id,
                  topic: item.topicid,
                  isCreated: true,
                  name: user.name,
                  icon: user.pfp,
                })
              }
              index={index}
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
};
