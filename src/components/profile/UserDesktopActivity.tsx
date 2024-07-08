// @ts-nocheck

import { useGetMarketsCreatedByUser } from "@/supabase/queries/useGetMarketsCreatedByUser";
import { useGetOrdersForUser } from "@/supabase/queries/user/useGetOrdersForUser";
import { aggregatePredictedItems } from "@/utils/predictions/aggregatePredictions";
import React, { useEffect } from "react";
interface UserActivityProps {
  walletAddress: string;
  userId: string;
  onParentRefresh?: boolean;
}

const UserActivity: React.FC<UserActivityProps> = ({
  walletAddress,
  userId,
  onParentRefresh,
}) => {
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
    <div className="h-screen w-full p-6">
      <h1 className="text-white text-2xl mb-4">Your Activity</h1>
      <div className="grid grid-cols-2 gap-4">
        {mergedData.map((item, index) => (
          <div
            key={index}
            className="relative bg-cover bg-center rounded-lg shadow-lg"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
            <div className="relative p-4 text-white">
              <span className="bg-green-500 text-xs font-semibold uppercase px-2 py-1 rounded">
                {item.type === "predicted" ? "Active" : "Correct"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserPredictionSkeleton: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div className="relative bg-gray-700 rounded-lg shadow-lg h-48 animate-pulse mb-4 w-35vw">
      <div className="absolute inset-0 bg-gray-500 opacity-50 rounded-lg"></div>
    </div>
  );
};
