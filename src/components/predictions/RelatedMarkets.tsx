// @ts-nocheck
import Link from "next/link";
import { StarHalf } from "lucide-react";
import { useGetRelatedMarkets } from "@/supabase/queries/reccomendations/useGetRelatedMarkets";
import { getMarketPath } from "@/utils/urls";

export function RelatedMarkets({
  topicId,
  id,
  isDesktop,
}: {
  topicId: string;
  id: number;
  isDesktop?: boolean;
}) {
  // Get Markets from topic
  const { data: markets } = useGetRelatedMarkets(topicId);

  if (markets && markets?.length >= 2)
    return (
      <div
        className={`
          flex flex-col z-20
          ${isDesktop ? "bg-transparent" : "bg-[#101010] p-4 pt-6"}
        `}
      >
        <div className="pb-3 flex flex-row items-center">
          <StarHalf color={"white"} strokeWidth={2.8} />
          <span className="text-[20px] text-white ml-0 font-[600]">
            Related Predictions
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {markets
            ?.filter((item) => item.id !== id)
            ?.slice(0, 4)
            ?.map((item, index) => {
              return (
                <RelatedMarketQuestion
                  isDesktop={isDesktop}
                  {...item}
                  key={index}
                />
              );
            })}
        </div>

        <div className="h-20" />
      </div>
    );

  return null;
}

function RelatedMarketQuestion({
  id,
  option,
  currentprob,
  initialprob,
  image,
  question,
  options,
  title,
  isDesktop,
}) {
  return (
    <Link href={getMarketPath(id)} prefetch={true}>
      <div
        className={`
          flex flex-row items-center
         rounded-[10px] cursor-pointer
          ${isDesktop ? "bg-transparent py-1.5 " : "bg-[#191919]   p-2"}
          transition-all
        `}
      >
        <img
          className="h-[54px] w-[54px]  rounded-[6px] object-cover"
          src={image}
          alt={title}
        />
        <div className="flex flex-col ml-[9px] -space-y-0.5">
          <span className="line-clamp-1 font-medium text-[16px] text-[lightgray] max-w-[73vw] mb-[1px] overflow-hidden">
            {question}
          </span>
          <span className="text-lg font-[600] text-white">
            {currentprob ?? initialprob}%{" "}
            {option === 0 ? options[option + 1].name : options[option - 1].name}
          </span>
        </div>
      </div>
    </Link>
  );
}
