// @ts-nocheck
import { MobileActivityPage } from "@/components/activity/MobileActivityPage";
import { DesktopUserActivity } from "@/components/profile/DesktopUserActivity";
import { ProfileSection } from "@/components/profile/DesktopProfilePage";
import { ActivityIcon } from "lucide-react";
import { useGetFollowingPredictions } from "@/supabase/queries/friends/useGetFollowingPredictions";
import { IUser } from "@/supabase/types";
import { InviteFriendsPlaceholder } from "../common/placeholders/InviteFriendsPlaceholder";
import { ActivityField } from "./ActivityField";
import { groupPredictionsByDate } from "@/utils/predictions/groupPredictionsByDate";
import { parseOptionJSON } from "@/utils/predictions/parseOption";
import { Leaderboard } from "./Leaderboard";
import { BlurOverlay } from "../onboarding/Invites/InviteBlur";

export function DesktopActivityPage({ userC }: { userC: IUser }) {
  const user = userC;

  return (
    <div className="flex flex-col bg-[#080808]">
      <div className="flex flex-row pt-3 px-8 space-x-5 items-center">
        <ActivityIcon size={"2.3rem"} color="white" strokeWidth={3} />
        <div className="text-[2.5rem]  text-white font-[Aeonik-Bold]">
          Activity
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-2 gap-5 w-full  pt-3 px-3">
        <div className="col-span-1 pr-14  border-r-[0.1rem] border-[#181818] px-4 h-full">
          <DesktopFriendActivity user={user} />
        </div>
        <div className=" px-9   h-full">
          <Leaderboard isDesktop />
        </div>
      </div>
    </div>
  );
}

function DesktopFriendActivity(props: { user: IUser }) {
  const {
    data: predictions,
    error,
    isLoading,
    refetch,
  } = useGetFollowingPredictions(props?.user?.external_auth_provider_user_id);

  const groupedPredictions = groupPredictionsByDate(predictions);

  return (
    <div>
      {predictions?.length > 0 ? (
        <div>
          {Object.entries(groupedPredictions).map(
            ([dateKey, predictions], index) => {
              return (
                <div key={dateKey}>
                  <h2
                    className={`
              font-extrabold text-[1.5rem] text-white -mb-px
              ${index === 0 ? "mt-4" : "mt-[22px]"}
            `}
                  >
                    {dateKey}
                  </h2>
                  {predictions.map((item, idx) => {
                    const option = parseOptionJSON(item.option);
                    return (
                      <ActivityField
                        isDesktop={true}
                        key={idx}
                        index={idx}
                        options={item.markets.options}
                        question={item.markets.question}
                        name={item.users.name}
                        pfp={item.users.pfp}
                        amount={(item.amount / 10 ** 6).toFixed(2)}
                        title={item.markets.title}
                        image={item.markets.image}
                        option={option}
                        id={item?.market_id}
                        odds={12}
                        userId={item?.user_id}
                        initialProb={item.markets.initialProb}
                        onOpenBottomSheet={() => {}}
                      />
                    );
                  })}
                </div>
              );
            }
          )}
          <div className="h-[110px]" />
        </div>
      ) : (
        <InviteFriendsPlaceholder isDesktop={true} />
      )}
    </div>
  );
}
