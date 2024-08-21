// @ts-nocheck
import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { useGetLPForUser } from "@/supabase/queries/user/useGetLPForUser";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { DesktopLpModal } from "@/components/lp/LpModal/DesktopLpModal";

import { DesktopMyBetModal } from "@/components/common/Charts/MyBetModal";

import {
  Banknote,
  BarChart,
  BellDot,
  ClipboardList,
  Copy,
  Filter,
  Pen,
  Pencil,
  PenLine,
  PiggyBank,
  Share,
  SlidersHorizontal,
  Stars,
  TrendingUp,
  UserPlus,
  Wallet,
} from "lucide-react";

import { Card } from "@/components/ui/tailwind/Card";
import { ChartConfig } from "@/components/ui/chart";
import { useUserStore } from "@/lib/stores/UserStore";
import { SocialsSection } from "@/components/common/SocialsSection";
import { useGetTotalFollowers } from "@/supabase/queries/user/useGetTotalFollowers";
import { useGetUserByExternalAuthId } from "@/supabase/queries/user/useGetUserByExternalAuthId";
import { useGetOrdersForUser } from "@/supabase/queries/user/useGetOrdersForUser";
import { aggregatePredictedItems } from "@/utils/predictions/aggregatePredictions";

import { GenericPolarChart } from "@/components/charts/GenericPolarChart";

import { ContrastButton } from "@/components/buttons/ContrastButton";
import { useGetUserOrders } from "@/graphql/queries/predictions/useGetUserOrders";
import { useGetOrdersByUser } from "@/graphql/queries/predictions/useGetOrdersByUser";
import { StandardPageWrapper } from "../layouts/StandardPageWrapper";
import {
  InverseBleedOverlay,
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "../layouts/StandardBleedOverlay";
import { shortenAddress } from "@/utils/address/shortenAddress";
import { FollowButton } from "./FollowButton";
import { useUserUsdcBalance } from "@/hooks/wallet/useUserUsdcBalance";
import { useGetMarketsCreatedByUser } from "@/supabase/queries/useGetMarketsCreatedByUser";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { BlurOverlay } from "../onboarding/Invites/InviteBlur";

export function DesktopProfilePage2({ userId, userC }) {
  const { user } = useUserStore();
  const balance = useUserUsdcBalance();
  const [filter, setFilter] = useState("All");
  const { data: ordersData } = useGetOrdersForUser(userC?.walletaddress);
  const { orders: ordersData2 } = useGetOrdersByUser(userC?.walletaddress);
  const {
    data: createdMarketsData,
    isLoading: isCreatedMarketsLoading,
    refetch: refetchCreated,
  } = useGetMarketsCreatedByUser(userC.external_auth_provider_user_id);

  const aggregatedOrdersData = aggregatePredictedItems(ordersData ?? []);
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

  console.log("user", mergedData);

  return (
    <StandardPageWrapper className="h-full min-h-screen flex flex-col">
      <StandardBleedOverlay>
        <InverseVerticalBleedOverlay>
          <div className="w-full h-80 relative">
            <img
              className="w-full transform rotate-180 object-cover h-60 relative -mt-24"
              alt="CoverImage"
              src={userC?.pfp}
            />
            <div className="h-80 w-full bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent backdrop-blur-lg absolute bottom-0" />
            <InverseBleedOverlay>
              <img
                className="size-28 md:size-30 lg:size-32 xl:size-36 ml-3 absolute -bottom-0 object-cover  rounded-full mb-4 border-8 border-[#080808] z-20"
                src={userC?.pfp}
              />
            </InverseBleedOverlay>
          </div>
        </InverseVerticalBleedOverlay>
      </StandardBleedOverlay>
      <div className="flex flex-col  gap-4 p-0 bg-[#080808] px-6 ">
        <div className="flex flex-row  items-center justify-between">
          <div className="flex flex-col">
            <div className="text-[2.6rem] font-[Aeonik-Bold] text-white">
              {userC.name}
            </div>
            <div className="text-[1.1rem] -mt-1 font-[500] text-[lightgray]">
              <SocialsSection {...userC?.socials} />
            </div>
          </div>
          <div className="flex flex-row items-center space-x-6 mt-2">
            <div className="flex flex-col space-y-0">
              <div className="text-[1rem] text-[lightgray] font-[600]">
                Accuracy
              </div>
              <div className="text-[1.8rem] text-white font-[Aeonik-Bold]">
                66%
              </div>
            </div>
            <div className="flex flex-col space-y-0">
              <div className="text-[1rem] text-[lightgray] font-[600]">
                Followers
              </div>
              <div className="text-[1.8rem] text-white font-[Aeonik-Bold]">
                222
              </div>
            </div>
            <div className="flex flex-col space-y-0">
              <div className="text-[1rem] text-[lightgray] font-[600]">
                Following
              </div>
              <div className="text-[1.8rem] text-white font-[Aeonik-Bold]">
                669
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-3 items-center mt-3">
          <div
            onClick={() => copyToClipboard(userC?.walletaddress)}
            className="py-2 hover:scale-101 active:scale-98 px-3 rounded-full bg-[#1B1B1E] space-x-2 flex flex-row items-center text-white text-[0.9rem] font-[500]"
          >
            <div>
              {userC?.walletaddress
                ? shortenAddress(userC?.walletaddress)
                : userC?.walletaddress}
            </div>
            <Copy size={16} color="white" strokeWidth={2.5} />
          </div>
          {userC?.name === user?.name ? (
            <div className="py-2 hover:scale-101 active:scale-98 px-3 rounded-full bg-[#1B1B1E] space-x-2 flex flex-row items-center text-white  text-[0.9rem] font-[600]">
              <div>Edit Profile</div>
            </div>
          ) : (
            <FollowButton profileId={userC?.external_auth_provider_user_id} />
          )}
        </div>
        {userC?.name === user?.name && balance < 1 && (
          <Link
            href={"/settings"}
            className="flex flex-row space-x-3 items-center "
          >
            <div className="py-2 px-3 rounded-full bg-[#1B1B1E] space-x-2 flex flex-row items-center text-white text-[0.9rem] font-[500]">
              <Wallet size={16} color="white" strokeWidth={3} />
              <div>Fund your account</div>
            </div>
          </Link>
        )}
        <div className="h-[0.1rem] w-full bg-[#222222] my-3" />
        <div className="flex flex-row items-center space-x-3">
          <div
            onClick={() => setFilter("All")}
            className={`py-2 px-3 rounded-full ${
              filter === "All" ? "bg-[#1B1B1E]" : "bg-[transparent]"
            } space-x-2 flex hover:scale-101 active:scale-98 flex-row items-center text-white  text-[0.9rem] font-[600]`}
          >
            <div>All</div>
            <div className="p-2 -mr-1 py-0.5 text-[0.85rem] rounded-full bg-[#414141]">
              <div>{ordersData?.length}</div>
            </div>
          </div>
          <div
            onClick={() => setFilter("Resolved")}
            className={`py-2 px-3 rounded-full ${
              filter === "Resolved" ? "bg-[#1B1B1E]" : "bg-[transparent]"
            } space-x-2 flex flex-row hover:scale-101 active:scale-98 items-center text-white  text-[0.9rem] font-[600]`}
          >
            <div>Resolved</div>
            <div className="p-2 -mr-1 py-0.5 text-[0.85rem] rounded-full bg-[#414141]">
              <div>0</div>
            </div>
          </div>
          <div
            onClick={() => setFilter("Created")}
            className={`py-2 px-3 rounded-full ${
              filter === "Created" ? "bg-[#1B1B1E]" : "bg-[transparent]"
            } space-x-2 flex flex-row hover:scale-101 active:scale-98 items-center text-white  text-[0.9rem] font-[600]`}
          >
            <div>Created</div>
            <div className="p-2 -mr-1 py-0.5 text-[0.85rem] rounded-full bg-[#414141]">
              <div>{createdMarketsData?.length}</div>
            </div>
          </div>
        </div>
        {mergedData.length > 0 ? (
          <div className="grid sm:grid-cols:1 md:grid-cols:2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {mergedData?.map((item, index) => {
              return (
                <ProfilePositionCard
                  userName={userC?.name}
                  pfp={userC?.pfp}
                  {...item}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="text-[2.2rem] mt-[8%] font-[Aeonik-Bold] text-white">
              Nothing here yet
            </div>
            <div className="text-[1.1rem]  font-[500] mt-0.5 text-[lightgray]">
              Make your first prediction and level up your accuracy score
            </div>
          </div>
        )}
      </div>
    </StandardPageWrapper>
  );
}

function ProfilePositionCard(
  image,
  title,
  description,
  icon,
  id,
  outcomea,
  optionA,
  userName
) {
  console.log("item", image, userName);
  return (
    <div className="w-full h-[50vh] border-2 border-[#121212] bg-[#212121] flex flex-col justify-between my-3 rounded-lg relative">
      <img
        src={"/images/Grid.png"}
        className="w-full h-full z-[1] object-cover rounded-lg absolute"
      />
      <div className="flex flex-col z-[10] pt-6 px-6">
        <div className="flex flex-row justify-between">
          <img
            src={image.image}
            className="h-20 w-20 object-cover  rounded-lg"
          />
          <div className="py-2 border-2 border-[#212121] h-10 px-3 rounded-full bg-[#1B1B1E]/40 backdrop-blur-md space-x-2 flex flex-row items-center text-white  text-[0.9rem] font-[600]">
            38% Chance
          </div>
        </div>
        {image.type === "created" ? (
          <div className="text-[1.8rem] mt-3 mb-2 font-[Aeonik-Bold] text-white">
            Created by
          </div>
        ) : (
          <div className="text-[2.6rem] mt-3 font-[Aeonik-Bold] text-white">
            {image.options[Number(image.option) === 1 ? 0 : 1].name}
          </div>
        )}
        <div className="text-[1rem] -mt-1 font-[500] text-[lightgray]">
          {image.type === "created" ? (
            <div className="py-3 border-2 border-[#212121] w-[33%]  h-11 px-3 pl-1.5 rounded-full bg-[#1B1B1E]/40 backdrop-blur-md space-x-2 flex flex-row items-center text-white  text-[0.9rem] font-[600]">
              <img src={image.pfp} className="h-7 w-7 rounded-full " />{" "}
              <div className="text-[1.02rem] font-[500]">{image.userName}</div>
            </div>
          ) : (
            `$${(Number(image.amount) / 10 ** 6).toFixed(2)} at stake`
          )}
        </div>
      </div>
      <div className="flex flex-col z-[10] px-6 pb-7">
        <div className="text-[1.8rem] mt-3 font-[Aeonik-Bold] text-white">
          {image.title}
        </div>
        <div className="text-[1rem]  font-[500] text-[lightgray]">
          {image.question}
        </div>
      </div>
    </div>
  );
}
