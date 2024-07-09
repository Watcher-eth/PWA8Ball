// @ts-nocheck

import React from "react";
import { useRouter } from "next/router";
import { StarHalf } from "lucide-react";
import { useGetRelatedMarkets } from "@/supabase/queries/reccomendations/useGetRelatedMarkets";

export const RelatedMarkets = (props: { topicId: string; id: number }) => {
  const router = useRouter();
  const { topicId, id } = props;

  // Get Markets from topic
  const { data: markets, error, isLoading } = useGetRelatedMarkets(topicId);

  if (markets && markets?.length >= 2)
    return (
      <div style={styles.relatedMarkets}>
        <div style={styles.header}>
          <StarHalf color={"white"} strokeWidth={3} />
          <span style={styles.headerText}>Related Predictions</span>
        </div>
        {markets?.map((item, index) => {
          if (index < 4 && item.id !== id)
            return (
              <div
                style={styles.marketItem}
                key={index}
                onClick={() =>
                  router.push({
                    pathname: `/p/${item.id}`,
                    query: {
                      id: item.id,
                    },
                  })
                }
              >
                <img
                  style={styles.marketImage}
                  src={item?.image}
                  alt={item?.title}
                />
                <div style={styles.marketDetails} className="space-y-[-4px]">
                  <span className="line-clamp-1	" style={styles.marketQuestion}>
                    {item?.question}
                  </span>
                  <span style={styles.marketProbability}>
                    {item?.currentprob ? item?.currentprob : item?.initialprob}%{" "}
                    {item?.option === 0
                      ? item?.options[item?.option + 1].name
                      : item.options[item?.option - 1].name}
                  </span>
                </div>
              </div>
            );
        })}

        <div style={styles.spacer} />
      </div>
    );

  return null;
};

const styles = {
  relatedMarkets: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#101010",
    marginTop: -80,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: "white",
    marginLeft: 0,
    fontWeight: "bold",
  },
  marketItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    borderRadius: 10,
    marginTop: 11,
    backgroundColor: "#1A1A1A",
    cursor: "pointer",
  },
  marketImage: {
    height: 54,
    width: 54,
    borderRadius: 8,
    overflow: "hidden",
    objectFit: "cover",
  },
  marketDetails: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 9,
  },
  marketQuestion: {
    fontSize: 16,
    color: "lightgray",
    maxWidth: "73vw", // Adjusted to 80% of the viewport width
    marginBottom: 1,
    overflow: "hidden",
  },
  marketProbability: {
    fontSize: 19,
    color: "white",
  },
  spacer: {
    height: 80,
  },
};
