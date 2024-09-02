// @ts-nocheck
import { motion } from "framer-motion";
import { useEffect } from "react";

import { useGetMarketsCreatedByUser } from "@/supabase/queries/useGetMarketsCreatedByUser";
import { aggregatePredictedItems } from "@/utils/predictions/aggregatePredictions";
import { DesktopMyBetModal } from "../common/Charts/MyBetModal";
import { UserPredictionSkeleton } from "./GeneralFeed/UserPredictionSkeleton";

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
      <h1 className="text-white text-2xl font-semibold ">Your Activity</h1>
      <div className="grid grid-cols-1 max-h-screen overflow-y-scroll space-y-1 mt-1">
        {mergedData?.length > 0 ? (
          mergedData.map((item, index) => (
            <DesktopMyBetModal
              key={`predicted-${item?.market_id}-${item?.option}`}
              title={item?.title}
              image={item?.image}
              price={item?.amount}
              ownedAmount={item?.amount}
              betId={item?.market_id}
              topic={item?.market_id}
              question={item?.question}
              options={item?.options[Number(item?.option) === 0 ? 1 : 0]}
              option={Number(item?.option) === 0 ? 1 : 0}
              optionNumber={Number(item?.option) === 0 ? 1 : 0}
              initialProb={item?.initialprob}
              user={item?.user}
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
                    <div className="text-[1rem]  line-clamp-1 text-white text-semibold">
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
            </DesktopMyBetModal>
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
