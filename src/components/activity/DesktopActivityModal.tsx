// @ts-nocheck

import { ActivityIcon, Calendar } from "lucide-react";
import { DesktopCardModal } from "../modals/DesktopCardModal";
import { useUserStore } from "@/lib/stores/UserStore";
import { groupPredictionsByDate } from "@/utils/predictions/groupPredictionsByDate";
import { parseOptionJSON } from "@/utils/predictions/parseOption";
import { InviteFriendsPlaceholder } from "../common/placeholders/InviteFriendsPlaceholder";
import { ActivityField } from "./ActivityField";
import { User } from "@/__generated__/graphql";
import { useGetFriendsPositions } from "@/graphql/queries/friends/useGetFriendsOrders";
import { HARD_MARKETS } from "@/constants/markets";
import { aggregatePredictedItemsWithImage } from "@/utils/predictions/aggregatePredictions";
import { Spinner } from "../modals/PredictModal/Spinner";
import { ActivityPlaceHolder } from "../common/placeholders/NewPlaceholders";

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
    loading: isLoading,
    refetch,
  } = useGetFriendsPositions(props?.user?.walletAddress);

  const aggregatedPredictions = predictions
    ? aggregatePredictedItemsWithImage(predictions, HARD_MARKETS)
    : [];

  const groupedPredictions = groupPredictionsByDate(aggregatedPredictions);
  console.log("userId activity", props?.user);

  if (isLoading && props?.user?.id && props?.user?.totalFollowing > 0)
    return (
      <div className="h-[45vh] bg-[transparent] flex justify-center items-center">
        <Spinner loading={isLoading} />
      </div>
    );
  if (!props?.user?.id) {
    return (
      <div className="h-[45vh] w-full flex justify-center items-center">
        <ActivityPlaceHolder user={props?.user} />
      </div>
    );
  }

  return (
    <div className="max-h-[68.5vh] flex flex-col overflow-scroll">
      {predictions?.length > 0 ? (
        <div>
          {Object.entries(groupedPredictions).map(
            ([dateKey, predictions], index) => {
              return (
                <div key={dateKey}>
                  <div className="flex items-center gap-2 mt-4 -mb-2">
                    <Calendar
                      color="lightgray"
                      size={"1.1rem"}
                      strokeWidth={2.5}
                    />
                    <h2
                      className={`
                font-medium text-[1.1rem] text-[lightgray]
              `}
                    >
                      {dateKey}
                    </h2>
                  </div>
                  {predictions.map((item, idx) => {
                    const option = parseOptionJSON(item.option);
                    return (
                      <ActivityField
                        refetch={refetch}
                        isDesktop={true}
                        key={idx}
                        index={idx}
                        option={{
                          name:
                            item?.option === 1
                              ? item.market?.outcomeA
                              : item.market?.outcomeB,
                          index: item?.option,
                          value:
                            item?.option === 1
                              ? item.market?.outcomeOddsA
                              : item.market?.outcomeOddsB,
                        }}
                        question={item.market.question}
                        name={item.user.name}
                        pfp={item.user.pfp}
                        amount={item.tokensOwned}
                        title={item.market.title}
                        image={item.image}
                        id={item?.marketId}
                        userId={item?.user?.walletAddress}
                        initialProb={item.market.initialProb}
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
        <div className="h-[45vh] pt-[20%] w-full flex justify-center items-center">
          <InviteFriendsPlaceholder isDesktop={true} />
        </div>
      )}
    </div>
  );
}
