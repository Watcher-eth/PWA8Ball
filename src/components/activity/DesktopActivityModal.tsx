// @ts-nocheck

import { ActivityIcon } from "lucide-react";
import { DesktopCardModal } from "../modals/DesktopCardModal";
import { useUserStore } from "@/lib/stores/UserStore";
import { IUser } from "@/supabase/types";
import { useGetFollowingPredictions } from "@/supabase/queries/friends/useGetFollowingPredictions";
import { groupPredictionsByDate } from "@/utils/predictions/groupPredictionsByDate";
import { parseOptionJSON } from "@/utils/predictions/parseOption";
import { InviteFriendsPlaceholder } from "../common/placeholders/InviteFriendsPlaceholder";
import { ActivityField } from "./ActivityField";
import { User } from "@/__generated__/graphql";

export function DesktopActivityModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  return (
    <DesktopCardModal
      title="Activity"
      subtitle="See what your friends have been upto"
      cardClassName=""
      dialogContentClassName=" backdrop-blur-lg "
      cardContentClassName="px-0 max-h-[70vh] min-h-[50vh] "
      dialogClassName=""
      content={
        <div className="flex flex-col w-full -mt-4  ">
          <div className=" gap-5 w-full   ">
            <div className="  px-6 h-full">
              <DesktopFriendActivity user={user} />
            </div>
          </div>
          <div className="bg-gradient-to-b h-20 w-full from-[transparent] rounded-lg via-[#080808]/60 to-[#080808] absolute bottom-0" />
        </div>
      }
    >
      {children}
    </DesktopCardModal>
  );
}

function DesktopFriendActivity(props: { user: User }) {
  const {
    data: predictions,
    error,
    isLoading,
    refetch,
  } = useGetFollowingPredictions(props?.user?.externalAuthProviderUserId);

  const groupedPredictions = groupPredictionsByDate(predictions);

  return (
    <div className="max-h-[68.5vh] flex flex-col overflow-scroll">
      {predictions?.length > 0 ? (
        <div>
          {Object.entries(groupedPredictions).map(
            ([dateKey, predictions], index) => {
              return (
                <div key={dateKey}>
                  <h2
                    className={`
                font-medium text-[1.1rem] text-[lightgray] -mb-1
                ${index === 0 ? "mt-2" : "mt-[25px]"}
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
