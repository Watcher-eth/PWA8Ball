// @ts-nocheck
import { useState } from "react";
import Link from "next/link";

import { Copy, Wallet } from "lucide-react";

import { useUserStore } from "@/lib/stores/UserStore";
import { SocialsSection } from "@/components/common/SocialsSection";

import { ContrastButton } from "@/components/buttons/ContrastButton";
import { StandardPageWrapper } from "../layouts/StandardPageWrapper";
import {
  InverseBleedOverlay,
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "../layouts/StandardBleedOverlay";
import { shortenAddress } from "@/utils/address/shortenAddress";
import { FollowButton } from "./FollowButton";
import { useUserUsdcBalance } from "@/hooks/wallet/useUserUsdcBalance";
import { copyToClipboard } from "@/utils/copyToClipboard";
import {
  BlurOverlay,
  BlurOverlayWrapper,
  withBlurOverlay,
} from "../onboarding/Invites/InviteBlur";
import AnimatedBackground from "../common/Animated/AnimatedSelector";
import { INVITES_ACTIVE } from "@/constants";
import { useGetPositionsByWallet } from "@/graphql/queries/positions/useGetPositionsByWallet";
import {
  aggregatePredictedItems,
  aggregatePredictedItemsWithImage,
} from "@/utils/predictions/aggregatePredictions";
import { HARD_MARKETS } from "@/constants/markets";
import { useGetCreatedMarketsByUser } from "@/graphql/queries/markets/useGetCreatedMarketsByUser";
import { PredictionPositionModal } from "../modals/PredictionPositionModal";
import { DesktopMyBetModal } from "../common/Charts/MyBetModal";
import { DEFAULT_PFP_PLACEHOLDER } from "@/constants/testData";
import { useUpsertUser } from "@/graphql/queries/users/useUpsertUser";

export function DesktopProfilePage2({ userId, userC }) {
  const { user, setUser } = useUserStore();
  const balance = useUserUsdcBalance();
  const [filter, setFilter] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPfp, setEditedPfp] = useState(userC.pfp);
  const { upsertUser } = useUpsertUser();
  const { orders: ordersData } = useGetPositionsByWallet(userId);
  const {
    markets: createdMarketsData,
    isLoading: isCreatedMarketsLoading,
    refetch: refetchCreated,
  } = useGetCreatedMarketsByUser(userId);
  const aggregatedOrdersData = aggregatePredictedItemsWithImage(
    ordersData ?? [],
    HARD_MARKETS
  );
  const mergedData =
    filter === "All"
      ? [
          ...aggregatedOrdersData.map((item) => ({
            ...item,
            type: "predicted",
          })),
          ...(createdMarketsData ?? []).map((item) => ({
            ...item,
            type: "created",
          })),
        ]
      : filter === "Created"
      ? [
          ...(createdMarketsData ?? []).map((item) => ({
            ...item,
            type: "created",
          })),
        ]
      : [];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedPfp(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleConfirm() {
    setUser({
      ...user,
      name: editedName?.length > 2 ? editedName : user?.name,
      pfp: editedPfp ?? user?.pfp,
    });

    await upsertUser({
      id: user?.walletAddress,
      name: editedName?.length > 2 ? editedName : user?.name,
      pfp: editedPfp ?? user?.pfp,
    });

    setIsEditing(false);
  }

  return (
    <BlurOverlayWrapper shouldShowOverlay={INVITES_ACTIVE}>
      <StandardPageWrapper className="h-full bg-[#080808] flex flex-col">
        <StandardBleedOverlay>
          <InverseVerticalBleedOverlay>
            <div className="w-full h-80 relative">
              <img
                className="w-full transform rotate-180 object-cover h-60 relative -mt-24"
                alt="CoverImage"
                src={editedPfp ? editedPfp : DEFAULT_PFP_PLACEHOLDER}
              />
              <div className="h-80 w-full bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent backdrop-blur-lg absolute bottom-0" />
              <InverseBleedOverlay>
                <div className="relative">
                  <img
                    className="size-28 active:scale-99 md:size-30 lg:size-32 xl:size-36 ml-3 absolute -bottom-14 object-cover rounded-full mb-4 border-[0.3rem] border-[#080808] z-20"
                    src={editedPfp ? editedPfp : DEFAULT_PFP_PLACEHOLDER}
                    onClick={() =>
                      isEditing && document.getElementById("fileInput").click()
                    }
                  />
                  {isEditing && (
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  )}
                </div>
              </InverseBleedOverlay>
            </div>
          </InverseVerticalBleedOverlay>
        </StandardBleedOverlay>
        <div className="flex flex-col gap-4 p-0 min-h-screen bg-[#080808] z-[20] -mt-6 px-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
              {isEditing ? (
                <input
                  type="text"
                  placeholder={user?.name}
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-[2.6rem] outline-none border-0 font-[Aeonik-Bold] text-[lightgray] bg-[transparent] rounded-lg "
                />
              ) : (
                <div className="text-[2.6rem] font-[Aeonik-Bold] text-white">
                  {user?.name}
                </div>
              )}
              {userC?.socials !== {} && (
                <div className="text-[1.1rem] -mt-1 font-[500] text-[lightgray]">
                  <SocialsSection {...userC?.socials} />
                </div>
              )}
            </div>
            <div className="flex flex-row items-center space-x-6 mt-2">
              <div className="flex flex-col space-y-0">
                <div className="text-[1rem] text-[lightgray] font-semibold">
                  Accuracy
                </div>
                <div className="text-[1.8rem] text-white font-[Aeonik-Bold]">
                  66%
                </div>
              </div>
              <div className="flex flex-col space-y-0">
                <div className="text-[1rem] text-[lightgray] font-semibold">
                  Followers
                </div>
                <div className="text-[1.8rem] text-white font-[Aeonik-Bold]">
                  222
                </div>
              </div>
              <div className="flex flex-col space-y-0">
                <div className="text-[1rem] text-[lightgray] font-semibold">
                  Following
                </div>
                <div className="text-[1.8rem] text-white font-[Aeonik-Bold]">
                  669
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row space-x-3 mt-3 items-center">
            <div
              onClick={() => copyToClipboard(userC?.walletaddress)}
              className="py-2 hover:scale-[100.8%] active:scale-99 px-3 rounded-full bg-[#1B1B1E] space-x-2 flex flex-row items-center text-white text-[0.9rem] font-[500]"
            >
              <div>
                {userC?.walletAddress
                  ? shortenAddress(userC?.walletAddress)
                  : userC?.walletAddress}
              </div>
              <Copy size={16} color="white" strokeWidth={2.5} />
            </div>
            {isEditing ? (
              <button
                onClick={handleConfirm}
                className="py-2 hover:scale-101 active:scale-98 px-3 rounded-full bg-[#1B1B1E] space-x-2 flex flex-row items-center text-white text-[0.9rem] font-semibold"
              >
                {editedName.length > 1 ? "Confirm" : "Cancel"}
              </button>
            ) : userC?.walletAddress === user?.walletAddress ? (
              <div
                onClick={() => setIsEditing(true)}
                className="py-2 hover:scale-101 active:scale-98 px-3 rounded-full bg-[#1B1B1E] space-x-2 flex flex-row items-center text-white text-[0.9rem] font-semibold"
              >
                Edit Profile
              </div>
            ) : (
              <FollowButton profileId={userC?.walletAddress} />
            )}
          </div>
          {userC?.name === user?.name && balance < 1 && (
            <Link
              href={"/settings"}
              className="flex flex-row space-x-3 items-center"
            >
              <div className="py-2 px-3 rounded-full bg-[#1B1B1E] space-x-2 flex flex-row items-center text-white text-[0.9rem] font-[500]">
                <Wallet size={16} color="white" strokeWidth={3} />
                <div>Fund your account</div>
              </div>
            </Link>
          )}
          <div className="h-[0.1rem] w-full bg-[#222222] my-3" />
          <div className="flex flex-row">
            <AnimatedBackground
              defaultValue={filter}
              onValueChange={(value) => setFilter(value)}
              className="bg-[#1B1B1E] space-x-3 rounded-full flex flex-row"
            >
              <div
                data-id="All"
                onClick={() => setFilter("All")}
                className="py-2 px-3 rounded-full space-x-2 flex hover:scale-101 active:scale-98 flex-row items-center text-white text-[0.9rem] font-semibold"
              >
                <div>All</div>
                <div className="p-2 -mr-1 py-0.5 text-[0.85rem] rounded-full bg-[#414141]">
                  <div>{ordersData?.length}</div>
                </div>
              </div>
              <div
                data-id="Resolved"
                onClick={() => setFilter("Resolved")}
                className="py-2 px-3 rounded-full space-x-2 flex flex-row hover:scale-101 active:scale-98 items-center text-white text-[0.9rem] font-semibold"
              >
                <div>Resolved</div>
                <div className="p-2 -mr-1 py-0.5 text-[0.85rem] rounded-full bg-[#414141]">
                  <div>0</div>
                </div>
              </div>
              <div
                data-id="Created"
                onClick={() => setFilter("Created")}
                className="py-2 px-3 rounded-full space-x-2 flex flex-row hover:scale-101 active:scale-98 items-center text-white text-[0.9rem] font-semibold"
              >
                <div>Created</div>
                <div className="p-2 -mr-1 py-0.5 text-[0.85rem] rounded-full bg-[#414141]">
                  <div>{createdMarketsData?.length}</div>
                </div>
              </div>
            </AnimatedBackground>
          </div>
          {mergedData.length > 0 ? (
            <div className="grid sm:grid-cols:1 md:grid-cols:2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {mergedData?.map((item, index) => {
                if (item.type === "created")
                  return (
                    <ProfilePositionCard
                      key={index}
                      userName={userC?.name}
                      pfp={userC?.pfp}
                      {...item}
                    />
                  );
                else console.log("item", item.market);
                return (
                  <DesktopMyBetModal
                    key={`predicted-${item.id}-${item.option}-${item?.outcomeOddsB}`}
                    title={item.market?.title}
                    image={item?.image}
                    price={item.tokensOwned}
                    ownedAmount={item.tokensOwned}
                    options={
                      item.option === 1
                        ? {
                            name: item?.market?.outcomeA,
                            odds: item?.market?.outcomeOddsA,
                          }
                        : {
                            name: item?.market?.outcomeB,
                            odds: item?.market?.outcomeOddsB,
                          }
                    }
                    percentage={item.percentage}
                    betId={item.marketId}
                    topic={item.marketId}
                    icon={item.icon}
                    question={item.market?.question}
                    option={item.option}
                    optionNumber={item.option}
                    isExternal={userId !== user?.walletAddress}
                    initialProb={item?.market?.initialProb / 100}
                    user={userC}
                    resolved={item?.market?.resolved}
                    outcome={item?.market?.outcome}
                  >
                    <ProfilePositionCard
                      key={index}
                      userName={userC?.name}
                      pfp={userC?.pfp}
                      {...item}
                    />
                  </DesktopMyBetModal>
                );
              })}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="text-[2.2rem] mt-[8%] font-[Aeonik-Bold] text-white">
                Nothing here yet
              </div>
              <div className="text-[1.1rem] font-[500] mt-0.5 text-[lightgray]">
                Make your first prediction and level up your accuracy score
              </div>
            </div>
          )}
        </div>
      </StandardPageWrapper>
    </BlurOverlayWrapper>
  );
}
function ProfilePositionCard(
  item,
  title,
  description,
  icon,
  id,
  outcomea,
  optionA,
  userName
) {
  return (
    <div className="w-full hover:scale-[100.5%] active:scale-99 h-[50vh] border-2 border-[#121212] bg-[#212121] flex flex-col justify-between my-3 rounded-lg relative">
      <img
        src={"/images/Grid.png"}
        className="w-full h-full z-[1] object-cover rounded-lg absolute"
      />
      <div className="flex flex-col z-[10] pt-6 px-6">
        <div className="flex flex-row justify-between">
          <img
            src={item.image}
            className="h-20 w-20 object-cover  rounded-lg"
          />
          <div className="py-2 border-2 border-[#212121] h-10 px-3 rounded-full bg-[#1B1B1E]/40 backdrop-blur-md space-x-2 flex flex-row items-center text-white  text-[0.9rem] font-semibold">
            {(
              (Number(item.option) === 1
                ? item?.market?.outcomeOddsA
                : item?.market?.outcomeOddsB) / 100
            ).toFixed(1)}
            % Chance
          </div>
        </div>
        {item.type === "created" ? (
          <div className="text-[1.8rem] mt-3 mb-2 font-[Aeonik-Bold] text-white">
            Created by
          </div>
        ) : (
          <div className="text-[2.6rem] mt-3 font-[Aeonik-Bold] text-white">
            {Number(item.option) === 1
              ? item?.market?.outcomeA
              : item?.market?.outcomeB}
          </div>
        )}
        <div className="text-[1rem] -mt-1 font-[500] text-[lightgray]">
          {item.type === "created" ? (
            <div className="py-3 border-2 border-[#212121] w-[33%]  h-11 px-3 pl-1.5 rounded-full bg-[#1B1B1E]/40 backdrop-blur-md space-x-2 flex flex-row items-center text-white  text-[0.9rem] font-semibold">
              <img src={item.pfp} className="h-7 w-7 rounded-full " />{" "}
              <div className="text-[1.02rem] font-[500]">{item.userName}</div>
            </div>
          ) : (
            `$${(
              (Number(item.tokensOwned) *
                ((Number(item.option) === 1
                  ? item?.market?.outcomeOddsA
                  : item?.market?.outcomeOddsB) /
                  100)) /
              10 ** 8
            ).toFixed(2)} at stake`
          )}
        </div>
      </div>
      <div className="flex flex-col z-[10] px-6 pb-7">
        <div className="text-[1.8rem] mt-3 font-[Aeonik-Bold] text-white">
          {item.type === "created" ? item.title : item?.market?.title}
        </div>
        <div className="text-[1rem]  font-[500] text-[lightgray]">
          {item.type === "created" ? item.question : item?.market?.question}
        </div>
      </div>
    </div>
  );
}
