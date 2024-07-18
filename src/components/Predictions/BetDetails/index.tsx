// @ts-nocheck
import { Gift } from "lucide-react";
import { useGetLPForUser } from "@/supabase/queries/user/useGetLPForUser";
import { useUserStore } from "@/lib/stores/UserStore.tsx";
import { parseAndFormatDate } from "@/utils/datetime/extractEndDate";
import { BoostDetail } from "./BoostDetail";
import { TopicInfoDetail } from "./TopicInfoDetail";
import { DetailRow } from "./DetailRow";

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
  const { day, month, year, fullMonth, fullDay } = parseAndFormatDate(endDate);
  const {
    data: positions,
    isLoading,
    refetch,
  } = useGetLPForUser(user?.walletaddress);

  console.log("details2", image);


  return (
    <div className="flex flex-col w-full p-4 pb-2 mb-2 space-y-4">
      <DetailRow
        icon={
          <>
            <span className="text-xs font-bold text-[#FF0050]">{month}</span>
            <span className="text-3xl font-bold mt-[-2] text-white">
              {day}
            </span>
          </>
        }
        title="End Date"
        subtitle={`${fullDay} ${fullMonth}, ${year}`}
      />
      <DetailRow
        icon={<Gift color="white" strokeWidth={2.5} size={34} />}
        title="Rewards"
        subtitle={`${multiplier.toFixed(1)}x $Cred Bonus`}
      />
      <BoostDetail
        id={id}
        image={image}
        isDesktop={isDesktop}
        handleBoost={handleBoost}
      />
      <TopicInfoDetail
        topicId={topicId}
        topic={topic}
        question={question}
        icon={icon}
        members={members}
        joined={joined}
      />
    </div>
  );
};


