// @ts-nocheck
import { Gift } from "lucide-react";
import { useUserStore } from "@/lib/stores/UserStore.tsx";
import { parseAndFormatDate } from "@/utils/datetime/extractEndDate";
import { BoostDetail } from "./BoostDetail";
import { TopicInfoDetail } from "./TopicInfoDetail";
import { DetailRow } from "./DetailRow";
import { useGetUserLp } from "@/graphql/queries/liquidity/useGetUserLp"

export function BetDetails({
  endDate,
  multiplier,
  topic,
  icon,
  topicId,
  question,
  members,
  joined,
  handleBoost,
  image,
  id,
  isDesktop,
}) {
  const { user } = useUserStore();
  const {
    data: positions,
    isLoading,
    refetch,
  } = useGetUserLp(user?.walletAddress);

  return (
    <div className="flex flex-col w-full p-4 px-3.5 pb-0 mb-2 space-y-2">
      <TopicInfoDetail
        topicId={topicId}
        topic={topic}
        question={question}
        icon={icon}
        members={members}
        joined={joined}
      />
      <BoostDetail
        id={id}
        image={image}
        isDesktop={isDesktop}
        handleBoost={handleBoost}
      />
    </div>
  );
}
