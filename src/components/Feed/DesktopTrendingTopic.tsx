import { useGetMembersForTopic } from "@/supabase/mutations/topics/useGetMembersForTopic";
import { useGetMarketsForTopic } from "@/supabase/queries/useGetMarketsForTopic";
import React from "react";

interface EventCardProps {
  title: string;
  subtitle: string;
  amount: string;
  participants: string[];
  date: string;
  imageUrl: string;
  topicId: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  subtitle,
  amount,
  participants,
  date,
  imageUrl,
  topicId,
}) => {
  //TODO: ADD get topic
  const id = topicId;
  const { data: membersProfiles } = useGetMembersForTopic(id);
  const { data: markets, error, isLoading } = useGetMarketsForTopic(id);

  return (
    <div
      className="relative bg-cover bg-center rounded-lg shadow-lg"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
      <div className="relative p-6 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <span className="bg-blue-500 text-xs font-semibold uppercase px-2 py-1 rounded">
            Trending
          </span>
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm mb-4">{subtitle}</p>
        <p className="text-lg font-semibold">{amount} Total</p>
        <p className="text-sm">{date}</p>
        <div className="flex mt-2 space-x-2">
          {membersProfiles?.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-full overflow-hidden w-8 h-8 border-2 border-gray-200"
            >
              <img
                src={member.pfp}
                alt={"Topic members"}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
