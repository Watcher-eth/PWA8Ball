// @ts-nocheck
import Link from "next/link";

import { StarHalf } from "lucide-react";
import { useGetRelatedMarkets } from "@/supabase/queries/reccomendations/useGetRelatedMarkets";


export const RelatedMarkets = ({topicId, id, isDesktop}: {
  topicId: string;
  id: number;
  isDesktop?: boolean;
}) => {

  // Get Markets from topic
  const { data: markets } = useGetRelatedMarkets(topicId);

  if (markets && markets?.length >= 2)
    return (
      <div
        className={`
          flex flex-col p-t
          ${isDesktop ? "bg-transparent" : "bg-[#121212]"}
        `}
      >
        <div className="pb-4" style={styles.header}>
          <StarHalf color={"white"} strokeWidth={3} />
          <span style={styles.headerText}>Related Predictions</span>
        </div>
        <div className="flex flex-col gap-2">
          {markets
            ?.filter((item) => item.id !== id)
            ?.slice(0, 4)
            ?.map((item, index) => {
              return <RelatedMarketQuestion {...item} key={index} />;
            })}
        </div>

        <div style={styles.spacer} />
      </div>
    );

  return null;
};

function RelatedMarketQuestion({
  id,
  option,
  currentprob,
  initialprob,
  image,
  question,
  options,
  title,
}) {
  return (
    <Link href={`/p/${id}`} prefetch={true}>
      <div
        className={`
          flex flex-row items-center
          p-2 rounded-[10px] cursor-pointer
          bg-transparent border border-white/10 hover:border-white/20
          transition-all
        `}
      >
        <img style={styles.marketImage} src={image} alt={title} />
        <div style={styles.marketDetails} className="">
          <span className="line-clamp-1	" style={styles.marketQuestion}>
            {question}
          </span>
          <span  className="text-lg" style={styles.marketProbability}>
            {currentprob ?? initialprob}%{" "}
            {option === 0 ? options[option + 1].name : options[option - 1].name}
          </span>
        </div>
      </div>
    </Link>
  );
}

const styles = {
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
    color: "white",
  },
  spacer: {
    height: 80,
  },
};
