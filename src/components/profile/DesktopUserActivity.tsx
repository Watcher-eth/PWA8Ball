// @ts-nocheck
import { useEffect } from "react";
import { useGetMarketsCreatedByUser } from "@/supabase/queries/useGetMarketsCreatedByUser";
import { useGetOrdersForUser } from "@/supabase/queries/user/useGetOrdersForUser";
import { aggregatePredictedItems } from "@/utils/predictions/aggregatePredictions";
import { UserPredictionSkeleton } from "./UserPredictions";
import { PredictionPositionModal } from "../Modals/PredictionPositionModal";
import { motion } from "framer-motion";
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
      <div className="grid grid-cols-1 gap-1">
        {mergedData?.length > 0 ? (
          mergedData.map((item, index) => (
            <PredictionPositionModal
              key={`predicted-${item.id}-${item.option}`}
              title={item.title}
              image={item.image}
              price={item.amount}
              ownedAmount={item.amount / 100000}
              options={item.options}
              betId={item.market_id}
              topic={item.market_id}
              icon={item.icon}
              question={item.question}
              option={item.option}
              optionNumber={item.option}
              onClose={() => handleOpenBottomSheet({})}
              openCashout={() => handleOpenBottomSheet({})}
              handleReceipt={() => handleOpenBottomSheet({})}
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                key={index}
                className="rounded-lg h-14 mt-1 flex flex-row justify-between items-center"
              >
                <div className="  flex flex-row items-center">
                  <img
                    className="h-12 object-cover w-12 rounded-md "
                    src={item?.image}
                  />
                  <div className="flex flex-col items-start ml-3 -space-y-[0.1rem]">
                    <div className="text-[0.85rem] text-[#909090]">
                      You predicted{" "}
                      {item?.option === 1
                        ? item.options[0].name
                        : item.options[1].name}
                    </div>
                    <div className="text-[1rem] -ml-2.5 line-clamp-1 text-white text-semibold">
                      {item?.question}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col -space-y-[0.1rem] -mt-[0.3rem]">
                  <div className="text-[1rem]  text-white text-semibold">
                    ${(item?.amount / 100000).toFixed(2)}
                  </div>
                  <div className="text-[0.85rem] text-[#909090]">+0.0%</div>
                </div>
              </motion.div>
            </PredictionPositionModal>
          ))
        ) : (
          <div className="max-w-full">
            {[1, 2, 3].map((item, index) => {
              return <UserPredictionSkeleton index={index} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
