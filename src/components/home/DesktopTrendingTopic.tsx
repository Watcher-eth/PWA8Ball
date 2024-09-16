// @ts-nocheck
import { formatMarketArr } from "@/utils/markets/formatMarketArr"
import { useGetMembersForTopic } from "@/supabase/mutations/topics/useGetMembersForTopic"
import { FeedCard } from "./FeedCard"
import Link from "next/link"
import { ELECTIONS_PATH, getTopicPath } from "@/utils/urls"
import { useGetAllMarketsForTopic } from "@/graphql/queries/topics/useGetAllMarketsForTopic"

export function DesktopTrendingTopics({
  title,
  subtitle,
  amount,
  participants,
  date,
  imageUrl,
  topicId,
}: {
  title: string
  subtitle: string
  amount: string
  participants: string[]
  date: string
  imageUrl: string
  topicId: string
}) {
  const { data: membersProfiles } = useGetMembersForTopic(topicId)
  const { data: markets } = useGetAllMarketsForTopic(topicId)

  return (
    <div className="relative mx-8 rounded-lg flex align-center shadow-inner justify-between h-[56vh] py-8 flex-row items-center   overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-[#080808] opacity-30 "></div>
      <div className="absolute inset-0 backdrop-filter backdrop-blur-3xl "></div>
      <div className="flex flex-col pt-6 h-full">
        <Link
          href={{
            pathname: topicId === "1" ? ELECTIONS_PATH : getTopicPath(topicId),
            query: {
              id: topicId,
              name: title,
              description: subtitle,
              image: imageUrl,
              members: membersProfiles,
            },
          }}
        >
          <img
            className="min-h-[10vh] ml-6 w-[10vh] rounded-xl relative z-10"
            src={imageUrl}
          />
        </Link>
        <div className="relative p-6  text-white flex flex-col w-[24vw] h-full  justify-between z-10">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-2">
              <span
                style={{ background: "rgba(21, 21, 21, 0.45)" }}
                className="text-xs font-semibold uppercase px-2 py-1 rounded-full"
              >
                🔥 Trending Today
              </span>
            </div>
            <Link
              href={{
                pathname:
                  topicId === "1" ? ELECTIONS_PATH : getTopicPath(topicId),
                query: {
                  id: topicId,
                  name: title,
                  description: subtitle,
                  image: imageUrl,
                  members: membersProfiles,
                },
              }}
            >
              <h2 className="text-[2rem] font-bold">{title}</h2>
            </Link>
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
                    className="bg-white rounded-full overflow-hidden size-8"
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
      <div className="relative w-[70vw] ">
        <div className="overflow-x-auto overflow-y-visible flex gap-4 p-2 pr-7">
          {formatMarketArr({ markets })?.map((market, index) => {
            return <FeedCard key={index} {...market} />
          })}
        </div>
      </div>
    </div>
  )
}
