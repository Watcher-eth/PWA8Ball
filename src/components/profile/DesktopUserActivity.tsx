// @ts-nocheck
import { useEffect } from "react";
import { useGetMarketsCreatedByUser } from "@/supabase/queries/useGetMarketsCreatedByUser";
import { useGetOrdersForUser } from "@/supabase/queries/user/useGetOrdersForUser";
import { aggregatePredictedItems } from "@/utils/predictions/aggregatePredictions";

import { PredictionPositionModal } from "../Modals/PredictionPositionModal";

export function DesktopUserActivity({
  walletAddress,
  userId,
  onParentRefresh,
}: {
  walletAddress: string;
  userId: string;
  onParentRefresh?: boolean;
}) {
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
      <div className="flex flex-col items-center h-screen">
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
    <div className="h-screen w-full max-w-[29%] p-4 pt-3">
      <h1 className="text-white text-2xl font-semibold mb-4">Your Activity</h1>
      <div className="grid grid-cols-2 gap-1">
        {mergedData?.length > 0
          ? mergedData.map((item, index) => (
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
                onClose={() => handleOpenBottomSheet({})}
                openCashout={() => handleOpenBottomSheet({})}
                handleReceipt={() => handleOpenBottomSheet({})}
              >
                <div
                  key={index}
                  className={`
                    relative size-[20vh] bg-cover bg-center rounded-lg shadow-lg
                    active:scale-99 hover:scale-101
                  `}
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="absolute inset-0 bg-black opacity-30 rounded-[1.5rem]"></div>

                  <div className="absolute bottom-0   p-4 text-white">
                    <span className="bg-green-500/70 backdrop-blur-lg text-xs font-semibold uppercase px-2 py-1 rounded-full">
                      {item.type === "predicted" ? "Active" : "Correct"}
                    </span>
                  </div>
                </div>
              </PredictionPositionModal>
            ))
          : [1, 2, 3].map((item, index) => {
              return <UserPredictionSkeleton index={index} />;
            })}
      </div>
    </div>
  );
}

function UserPredictionSkeleton({ index }: { index: number }) {
  return (
    <div className="relative bg-[#212121] rounded-lg shadow-lg h-48 -mr-9 animate-pulse mb-3 w-48">
      <div className="absolute inset-0 bg-[#212121] opacity-50 rounded-lg"></div>
    </div>
  );
}
