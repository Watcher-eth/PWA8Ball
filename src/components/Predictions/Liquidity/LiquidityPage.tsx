// @ts-nocheck

import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "@/lib/stores/UserStore";
import { LiquidityPosition } from "./LiquidityPosition";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useGetLPForUser } from "@/supabase/queries/user/useGetLPForUser";
import { NewPlaceholderLp } from "@/components/Common/Placeholders/NewPlaceholders";

export const LiquidityPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const {
    data: positions,
    isLoading,
    refetch,
  } = useGetLPForUser(user?.walletaddress);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const filteredPositions = useMemo(
    () => positions?.filter((item) => item.amount > 0) || [],
    [positions]
  );

  return (
    <div
      style={{
        paddingTop: "60px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#101010",
        width: "100%",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "18px",
          marginBottom: "18px",
          justifyContent: "space-between",
        }}
      >
        <motion.button
          onClick={() => {
            router.back();
          }}
          style={{
            height: "30px",
            width: "30px",
            backgroundColor: "rgba(100, 100, 100, 0.4)",
            borderRadius: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 4,
            border: "none",
            cursor: "pointer",
          }}
        >
          <ChevronLeft height={21} color={"white"} strokeWidth={4} />
        </motion.button>
        <span
          style={{
            color: "white",
            fontSize: "23px",
            fontWeight: 600,
          }}
        >
          Your Boosts
        </span>
        <div className="w-5" />
      </div>
      {filteredPositions?.length > 0 ? (
        <div style={{ paddingBottom: 20 }}>
          {filteredPositions.map((item, index: number) => (
            <LiquidityPosition
              key={index}
              amount={item.amount / 10 ** 6}
              image={item.image}
              title={item.title}
              id={item.marketId}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            overflowY: "scroll",
          }}
        >
          <NewPlaceholderLp isUser={true} />
        </div>
      )}
    </div>
  );
};

