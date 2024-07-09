// @ts-nocheck

import { useGetMembersForTopic } from "@/supabase/mutations/topics/useGetMembersForTopic";
import { useGetMarketsForTopic } from "@/supabase/queries/useGetMarketsForTopic";
import React from "react";
import { Cards } from "./Cards";
import { parseOptions } from "@/utils/predictions/parseOption";

interface EventCardProps {
  title: string;
  subtitle: string;
  amount: string;
  participants: string[];
  date: string;
  imageUrl: string;
  topicId: string;
}

export const DesktopTrendingTopics: React.FC<EventCardProps> = ({
  title,
  subtitle,
  amount,
  participants,
  date,
  imageUrl,
  topicId,
}) => {
  const id = topicId;
  const { data: membersProfiles } = useGetMembersForTopic(id);
  const { data: markets, error, isLoading } = useGetMarketsForTopic(id);

  return (
    <div className="relative w-[95vw] flex align-center h-[48vh] p-3 py-8 rounded-[1.2rem] shadow-lg overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-[#080808] opacity-30 rounded-lg"></div>
      <div className="absolute inset-0 backdrop-filter backdrop-blur-lg rounded-lg"></div>
      <div className="flex flex-col">
        <img
          className="min-h-[10vh] ml-6 w-[10vh] rounded-xl relative z-10"
          src={imageUrl}
        />
        <div className="relative p-6 text-white flex flex-col w-[24vw] h-[37vh] justify-between z-10">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-2">
              <span
                style={{ background: "rgba(21, 21, 21, 0.45)" }}
                className="text-xs font-semibold uppercase px-2 py-1 rounded-full"
              >
                🔥 Trending
              </span>
            </div>
            <h2 className="text-[2rem] font-bold">{title}</h2>
            <p className="text-md mt-[-0.4rem] mb-4">{subtitle}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[1.8rem] flex flex-row font-semibold align-sub">
              <span>${amount}</span>{" "}
              <span className="text-[1.1rem] ml-1">Total</span>
            </p>
            <p className="text-sm">{date}</p>
            <div className="flex flex-row mt-2 items-center align-center">
              <div className="flex  space-x-[-0.5rem]">
                {membersProfiles?.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-full overflow-hidden w-8 h-8"
                  >
                    <img
                      src={member.pfp}
                      alt={"Topic members"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-[1.1rem] ml-2 text-[lightgray]">
                {membersProfiles?.length}+ Members
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-[70vw] mt-[-1.6rem]">
        <div className="overflow-x-auto flex space-x-4">
          {markets?.map((market, index) => {
            console.log("Rendering card for market:", market); // Log each market being rendered
            return (
              <div key={index}>
                <Cards
                  handleOpen={() => {}}
                  image={market.image || ""}
                  icon={market.topic_image || ""}
                  description={market.question || ""}
                  title={market.title || ""}
                  subject={market.topic_title || "Unknown"}
                  id={market.id || ""}
                  stake={market.usdcstake || 0}
                  multiplier={
                    market.outcomea === market.outcomeb
                      ? 2
                      : market.outcomea > market.outcomeb
                      ? 1 + (100 - market.outcomeb) / market.outcomeb
                      : 1 + (100 - market.outcomea) / market.outcomea
                  }
                  topicId={market.topic_id || ""}
                  optionA={{
                    multiplier: 1,
                    name: parseOptions(market?.options, 1),
                    odds: market.outcomea || 50,
                  }}
                  optionB={{
                    multiplier: 1,
                    name: parseOptions(market?.options, 2),
                    odds: market.outcomeb || 50,
                  }}
                  topicBio={market?.topic_description || ""}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
