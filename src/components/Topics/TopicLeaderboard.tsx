// @ts-nocheck

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetLeaderboardForTopic } from "@/lib/supabase/queries/leaderboard/fetchLeaderBoardForTopic";

const Leaderboard = ({ topicId }) => {
  const router = useRouter();

  const {
    data: topPredictors,
    error,
    isLoading,
  } = useGetLeaderboardForTopic(topicId);

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", marginTop: 7 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "12px 0",
            }}
          >
            <span
              style={{ color: "white", fontFamily: "AeonikBold", fontSize: 15 }}
            >
              Name
            </span>
            <span
              style={{ color: "white", fontFamily: "AeonikBold", fontSize: 15 }}
            >
              At stake
            </span>
          </div>
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "10px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "white", fontFamily: "AeonikBold" }}>
                  {index + 1}
                </span>
                <div style={{ margin: "0 18px", marginLeft: 10 }}>
                  <Skeleton className="w-30 h-30 rounded-full" />
                </div>
                <Skeleton className="h-17 w-40" />
              </div>
              <Skeleton className="h-14 w-25" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <span style={{ color: "white" }}>An error occurred: {error.message}</span>
    );
  }

  if (!topPredictors) {
    return (
      <div style={{ marginTop: 8 }}>
        <Skeleton className="w-full h-[600px] rounded-lg" />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 7 }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "12px 0",
          }}
        >
          <span
            style={{ color: "white", fontFamily: "AeonikBold", fontSize: 15 }}
          >
            Name
          </span>
          <span
            style={{ color: "white", fontFamily: "AeonikBold", fontSize: 15 }}
          >
            At stake
          </span>
        </div>
        {topPredictors.map((predictor, index) => (
          <div
            onClick={() => router.push(`/profile?id=${predictor.user_id}`)}
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "7px 0",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span style={{ color: "white", fontFamily: "AeonikBold" }}>
                {index + 1}
              </span>
              <img
                src={predictor.pfp}
                alt="Profile"
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: "50%",
                  margin: "0 20px",
                  marginLeft: 10,
                }}
              />
              <span
                style={{
                  color: "white",
                  fontFamily: "AeonikBold",
                  fontSize: 17,
                }}
              >
                {predictor.name}
              </span>
            </div>
            <span
              style={{
                color: "lightgray",
                fontFamily: "AeonikRegular",
                fontSize: 15,
              }}
            >
              ${(predictor.total_amount / 1000000).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TopicLeaderboard = ({ image, name, topicId }) => {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: 20,
        paddingTop: 75,
        backgroundColor: "#101010",
        height: "100vh",
        position: "relative",
      }}
    >
      <img
        src={image}
        alt="Topic"
        style={{ position: "absolute", top: 0, width: width, height: 88 }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: 88,
          backdropFilter: "blur(20px)",
        }}
      />
      <div
        style={{
          background:
            "linear-gradient(0deg, #101010 0%, rgba(10,10,10,0.9) 25%, rgba(10,10,10,0.8) 50%, rgba(10,10,10,0.7) 75%, transparent 100%)",
          position: "absolute",
          top: 0,
          width: "100%",
          height: 88,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          gap: 7,
        }}
      >
        <div
          style={{
            padding: 6,
            borderRadius: 20,
            backgroundColor: "#1C1C1E",
            cursor: "pointer",
          }}
          onClick={() => router.back()}
        >
          <ChevronLeft color={"white"} strokeWidth={5} size={19} />
        </div>

        <span
          style={{
            fontSize: name.length < 22 ? 20 : 17,
            color: "white",
            fontWeight: "700",
            fontFamily: "AeonikBold",
          }}
        >
          {name} Leaderboard
        </span>
        <img
          src={image}
          alt="Topic"
          style={{
            height: 30,
            width: 30,
            overflow: "hidden",
            borderRadius: "50%",
          }}
        />
      </div>

      <div style={{ overflowY: "scroll", width: "100%" }}>
        <Leaderboard topicId={topicId} />
      </div>
    </div>
  );
};

export default TopicLeaderboard;
