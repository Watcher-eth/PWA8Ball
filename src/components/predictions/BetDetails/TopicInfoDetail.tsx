import { Users } from "lucide-react"
import Link from "next/link"
import { getTopicPath } from "@/utils/urls"

export function TopicInfoDetail({
  topicId,
  topic,
  question,
  icon,
  members,
  joined,
}: {
  topicId: string
  topic: string
  question: string
  icon: string
  members: number
  joined: boolean
}) {
  return (
    <Link
      href={{
        pathname: Number(topicId) !== 1 ? getTopicPath(topicId) : `/elections`,
        query: {
          id: topicId,
          name: topic,
          description: question,
          image: icon,
          topic,
          members,
        },
      }}
    >
      <div
        className={`
            flex flex-row w-full items-center justify-between
   -mt-1
            rounded-[12px]
         active:scale-98 transition-all
          `}
      >
        <>
          <div className="flex flex-row items-center">
            {icon ? (
              <img
                src={icon}
                alt={topic}
                className="size-12 object-cover rounded-md overflow-hidden mr-2"
              />
            ) : (
              <div className="size-12 rounded-md bg-gray-200 mr-2" />
            )}
            <div className="flex flex-col  space-y-[-0.1rem]">
              <span className="text-sm font-bold text-[lightgray]">
                /{topic}
              </span>
              <div className="flex flex-row items-center">
                <Users color="white" size={17} strokeWidth={3.2} />
                <span className="text-lg font-bold text-white ml-1">
                  {members} {members > 1 ? "Members" : "Member"}
                </span>
              </div>
            </div>
          </div>
        </>
        <div>
          <div
            className={`
                flex flex-row w-full items-center justify-between
                px-4 py-1 border border-white/10 hover:border-white/20
                hover:scale-101 active:scale-98 transition-all
                ${joined ? "bg-white" : "bg-transparent"}
              `}
            style={{ borderRadius: 20 }}
          >
            <span
              className={`text-md font-bold ${
                joined ? "text-gray-200" : "text-white"
              }`}
            >
              {joined ? "Joined" : "Join"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
