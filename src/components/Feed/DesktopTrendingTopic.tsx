// @ts-nocheck
import { useGetMembersForTopic } from "@/supabase/mutations/topics/useGetMembersForTopic";
import { useGetMarketsForTopic } from "@/supabase/queries/useGetMarketsForTopic";
import { Cards } from "./Cards";
import { parseOptions } from "@/utils/predictions/parseOption";
import { formatMarketArr } from "./formatMarketArr";

export function DesktopTrendingTopics({
  title,
  subtitle,
  amount,
  participants,
  date,
  imageUrl,
  topicId,
}: {
  title: string;
  subtitle: string;
  amount: string;
  participants: string[];
  date: string;
  imageUrl: string;
  topicId: string;
}) {
  const { data: membersProfiles } = useGetMembersForTopic(topicId);
  const { data: markets, error, isLoading } = useGetMarketsForTopic(topicId);

  return (
    <div className="relative w-[calc(100%-64px)] flex align-center h-[49vh] mx-8 py-8 rounded-[1.2rem] shadow-lg overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-[#080808] opacity-30 rounded-lg"></div>
      <div className="absolute inset-0 backdrop-filter backdrop-blur-lg rounded-lg"></div>
      <div className="flex flex-col h-ful">
        <img
          className="min-h-[10vh] ml-6 w-[10vh] rounded-xl relative z-10"
          src={imageUrl}
        />
        <div className="relative p-6 pb-0 text-white flex flex-col w-[24vw] h-full justify-between z-10">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-2">
              <span
                style={{ background: "rgba(21, 21, 21, 0.45)" }}
                className="text-xs font-semibold uppercase px-2 py-1 rounded-full"
              >
                🔥 Trending Today
              </span>
            </div>
            <h2 className="text-[2rem] font-bold">{title}</h2>
            <p className="text-md mt-[-0.4rem] mb-4">{subtitle}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[1.8rem] flex flex-row font-semibold align-start">
              <span>${amount}</span>{" "}
              <span className="text-[0.85rem] ml-1 mt-4 self-start">
                at Stake
              </span>
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
      <div className="relative w-[70vw] -mt-4">
        <div className="overflow-x-auto overflow-y-visible flex gap-4 p-2">
          {formatMarketArr({ markets })?.map((market, index) => {
            console.log("Rendering card for market:", market); // Log each market being rendered
            return (
              <div key={index}>
                <Cards handleOpen={() => {}} {...market} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
