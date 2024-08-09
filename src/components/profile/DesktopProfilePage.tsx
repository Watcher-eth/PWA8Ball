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
  BarChart,
  ClipboardList,
  Filter,
  Pencil,
  Share,
  SlidersHorizontal,
  Stars,
  TrendingUp,
  UserPlus,
} from "lucide-react";

import { Card } from "@/components/ui/tailwind/Card";
import { ChartConfig } from "@/components/ui/chart";
import { useUserStore } from "@/lib/stores/UserStore";
import { SocialsSection } from "@/components/common/SocialsSection";
import { useGetTotalFollowers } from "@/supabase/queries/user/useGetTotalFollowers";
import { useGetUserByExternalAuthId } from "@/supabase/queries/user/useGetUserByExternalAuthId";
import { useGetOrdersForUser } from "@/supabase/queries/user/useGetOrdersForUser";
import { aggregatePredictedItems } from "@/utils/predictions/aggregatePredictions";

import { useUpdateUserProfile } from "@/supabase/mutations/updateUser";
import { GenericPolarChart } from "@/components/charts/GenericPolarChart";

import { ContrastButton } from "@/components/buttons/ContrastButton";
import { trackViewMarket } from "@/lib/events/StandardEvents";

export function DesktopProfilePage() {
  const { user } = useUserStore();

  const { data: userC } = useGetUserByExternalAuthId(
    user?.external_auth_provider_user_id
  );
  const { data: ordersData } = useGetOrdersForUser(userC?.walletaddress);

  const aggregatedOrdersData = aggregatePredictedItems(ordersData || []);
  const mergedData = [
    ...aggregatedOrdersData.map((item) => ({ ...item, type: "predicted" })),
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-[#080808] px-8">
      <ProfileSection userC={userC} user={user} />

      <div className="flex flex-col md:w-1/3 bg-[#121212] rounded-[1.5rem] p-8">
        <div className="w-full flex flex-row justify-between ">
          <div>
            <h2 className="text-white text-2xl font-semibold">
              {user?.name}'s Predictions
            </h2>
            <h2 className="text-[#999999] text-md font-[500] mb-3">
              Active Predictions{" "}
            </h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="px-2 p-4 h-8 bg-[#212121] flex justify-center items-center rounded-full">
                <SlidersHorizontal
                  className="h-[1rem] w-[1rem]"
                  color="white"
                  strokeWidth={2.8}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#181818]/60 mr-2 mt-2 text-white z-20 rounded-md backdrop-blur-lg border-2 w-full border-[#212121]">
              <DropdownMenuGroup className="p-1">
                <DropdownMenuItem className="p-1">
                  All Predictions
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#404040]" />
                <DropdownMenuItem className="p-1">
                  Correct Predictions
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#404040]" />
                <DropdownMenuItem className="p-1">
                  Created Predictions
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col w-full gap-1">
          {mergedData.map((item, index) => (
            <DesktopMyBetModal
              key={`predicted-${item.id}-${item.option}`}
              title={item.title}
              image={item.image}
              price={item.amount}
              ownedAmount={item.amount / 100000}
              options={item.options}
              percentage={item.percentage}
              betId={item.market_id}
              topic={item.market_id}
              icon={item.icon}
              question={item.question}
              option={item.option}
              optionNumber={item.optionNumber}
              isExternal={item.isExternal}
              initialProb={item.initialprob}
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                key={index}
                className="rounded-lg h-14 mt-1 flex flex-row justify-between items-center"
              >
                <div className="  flex flex-row items-center">
                  <img
                    className="h-12 object-cover w-12 rounded-md "
                    src={item?.image}
                  />
                  <div className="flex flex-col ml-3 -space-y-[0.1rem]">
                    <div className="text-[0.85rem] text-[#909090]">
                      You predicted{" "}
                      {item?.option === 1
                        ? item.options[0].name
                        : item.options[1].name}
                    </div>
                    <div className="text-[1rem] line-clamp-1 text-white text-semibold">
                      {item?.question}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col -space-y-[0.1rem] -mt-[0.3rem]">
                  <div className="text-[1rem]  text-white text-semibold">
                    ${(item?.amount / 100000).toFixed(2)}
                  </div>
                  <div className="text-[0.85rem] text-[#909090]">+0.0%</div>
                </div>
              </motion.div>
            </DesktopMyBetModal>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:w-1/3  ">
        <div className="mb-4 bg-[#121212] rounded-lg p-5 pb-4 ">
          <div className="flex flex-row justify-between">
            <div className="inline-block">
              <h2 className="text-white text-xl font-bold">
                Resolved Predictions
              </h2>
              <h2 className="text-[#999999] text-sm">
                2 Predictions ready to redeem
              </h2>
            </div>
            <Stars
              className="inline-block mt-2 transform rotate-12	 text-white"
              strokeWidth={3}
            />
          </div>
          {mergedData?.map((item, index) => {
            if (index < 3)
              return (
                <Link
                  onClick={() => trackViewMarket(String(item.market_id), "pwa")}
                  href={`/p/${item.market_id}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-lg h-14 mt-1 flex flex-row items-center"
                  >
                    <img
                      className="h-11 object-cover w-11 rounded-md "
                      src={item?.image}
                    />
                    <div className="flex flex-col ml-3 -space-y-[0.1rem]">
                      <div className="text-[0.85rem] text-[#909090]">
                        You predicted{" "}
                        {item?.option === 1
                          ? item.options[0].name
                          : item.options[1].name}
                      </div>
                      <div className="text-[1rem] line-clamp-1 text-white text-semibold">
                        {item?.question}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
          })}
        </div>
        <DesktopUserBoostOverview address={userC?.walletaddress} />
      </div>
    </div>
  );
}

const DesktopUserBoostOverview = (props: { address: string }) => {
  const {
    data: positions,
    isLoading,
    refetch,
  } = useGetLPForUser(props?.address);

  const filteredPositions = useMemo(
    () => positions?.filter((item) => item.amount > 0) || [],
    [positions]
  );
  const totalValue = useMemo(() => {
    return filteredPositions.reduce((acc, item) => acc + item.amount, 0);
  }, [filteredPositions]);
  return (
    <div className="bg-[#121212] rounded-[1.5rem] min-h-[53vh] p-5 pt-6">
      <div className="mb-4">
        <div className="flex items-center mb-4">
          <div className="bg-[#171717] h-24 w-24 mr-3 rounded-lg"></div>
          <div className="text-white">
            <div className="-space-y-1">
              <p className="text-[#999999] text-[0.7rem]">Total locked</p>
              <h2 className="text-xl font-bold ">
                ${(totalValue / 1000000).toFixed(2)}
              </h2>
            </div>
            <div className="flex justify-between space-x-3 text-sm mt-1">
              <div className="-space-y-1 mr-2">
                <p className="text-[#999999] text-[0.7rem] ">Fees earned</p>
                <p className="font-bold text-[1rem]">$0.00</p>
              </div>
              <div className=" -space-y-1">
                <p className="text-[#999999] text-[0.7rem]">Cred earned</p>
                <p className="font-bold text-[1rem]">230 Cred</p>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-white -ml-1 flex flex-row items-center text-lg font-semibold mb-4">
          <BarChart strokeWidth={2.8} className="h-[1.13rem] " color="white" />{" "}
          Your active Boosts
        </h3>
        <div className="space-y-4">
          {filteredPositions?.map((item, index) => {
            return (
              <DesktopLpModal
                image={item?.image}
                title={item?.title}
                amount={item?.amount}
                id={item?.marketid}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-lg mt-2 flex items-center"
                >
                  <img
                    src={item?.image}
                    className="h-11 object-cover w-11 rounded-md mr-3"
                  />

                  <div>
                    <p className="text-[#999999] text-[0.84rem]">
                      Boost amount ${(item.amount / 10 ** 6).toFixed(2)}
                    </p>
                    <p className="text-white text-[1rem] font-[500] line-clamp-1">
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              </DesktopLpModal>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function TextWithSuffix({ value, suffix }: { value: number; suffix: string }) {
  return (
    <div className="text-center">
      <p className="font-bold text-lg">{value}</p>
      <p className="text-[#909090] text-sm">{suffix}</p>
    </div>
  );
}

export const ProfileSection = ({ userC, user }) => {
  const [edit, setEdit] = useState(false);
  const [userName, setUsername] = useState<string>();
  const [pfp, setPfp] = useState<string>();
  const fileInputRef = useRef(null);
  const { mutate: updateUserProfile } = useUpdateUserProfile();
  const { data: totalFollowers } = useGetTotalFollowers(
    userC?.external_auth_provider_user_id
  );

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const chartData = [
    { category: "GTA 6", percentage: 28, fill: "#FF6600" },
    { category: "US Elections", percentage: 42, fill: "#1E90FF" },
  ];

  return (
    <Card className="flex flex-col md:w-1/3 bg-[#121212] rounded-[1.5rem] p-4 px-8 relative">
      {/* <img
        src={userC?.pfp}
        alt="Profile Header"
        className="w-full h-10 absolute top-0 left-0 rounded-t-[1.5rem] right-0 object-cover"
      /> */}
      <div className="flex flex-col items-center mb-4 mt-6 relative">
        <img
          src={userC?.pfp}
          alt="Profile"
          className="rounded-full h-24 w-24 mb-2 cursor-pointer"
          onClick={edit ? handleImageClick : () => {}}
        />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          // onChange={handleFileChange}
        />

        {edit === true && (
          <div
            onClick={handleImageClick}
            className="p-0.5 hover:scale-103 active:scale-98 py-1.5 absolute bottom-14 border-[0.2rem] border-[#121212]  right-1/3  rounded-full bg-[white] mr-7 flex justify-center items-center"
          >
            <Pencil className="text-black h-[0.9rem]" strokeWidth={2.7} />
          </div>
        )}
        {edit === true ? (
          <input
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={userC?.name}
            className="text-white border-0 active:border-0 rounded-md text-xl w-1/8 text-center bg-transparentfont-bold"
          ></input>
        ) : (
          <h2 className="text-white text-xl font-bold">{userC?.name}</h2>
        )}
        <SocialsSection {...userC?.socials} />
      </div>
      <div className="flex justify-between text-white mb-4 px-2">
        <TextWithSuffix value={totalFollowers} suffix="Followers" />
        <TextWithSuffix value={"555"} suffix="Following" />
        <TextWithSuffix value={"12"} suffix="Predictions" />
      </div>
      <div className="flex justify-between mb-4 space-x-4">
        <ShareButton />
        {userC?.external_auth_provider_user_id ===
        user?.external_auth_provider_user_id ? (
          <ContrastButton
            label="Edit"
            IconComponent={Pencil}
            onClick={() => {
              setEdit(!edit);
            }}
          />
        ) : (
          <ContrastButton label="Follow" IconComponent={UserPlus} />
        )}
      </div>
      <div>
        <div>
          <div className="mx-auto aspect-square h-[250px]">
            <GenericPolarChart
              chartData={chartData}
              angleKey="category"
              radiusKey="percentage"
            />
          </div>
          <div className="flex-col space-y-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month{" "}
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div className="leading-none text-gray-400">
              Showing accuracy for the last 6 months
            </div>
          </div>
        </div>
        {userName?.length > 0 ||
          (pfp?.length > 0 && (
            <div
              onClick={() => {
                updateUserProfile({
                  userId: user?.external_auth_provider_user_id,
                  updates: {
                    name: userName?.length > 0 ? userName : user?.name,
                    pfp: pfp?.length > 0 ? pfp : user?.pfp,
                  },
                });
              }}
              className="w-full bg-[#151515] hover:scale-102 active:scale-98 p-3 text-white font-semibold rounded-md flex justify-center items-center"
            >
              Save changes
            </div>
          ))}
      </div>
    </Card>
  );
};

function ShareButton() {
  return (
    <ContrastButton
      label="Share"
      IconComponent={Share}
      onClick={() => {
        toast(
          <div className="w-full rounded-full bg-[#101010] text-[1rem] px-3 pr-4 text-white flex flex-row items-center p-2">
            <div className="p-0.5 py-1.5 rounded-full bg-[#323232] mr-2 flex justify-center items-center">
              <ClipboardList className="text-white h-[0.95rem]" />
            </div>
            Copied to Clipboard
          </div>,
          {
            unstyled: true,
            classNames: {
              title: "text-red-400 text-2xl",
              description: "text-red-400",
              actionButton: "bg-zinc-400",
              cancelButton: "bg-orange-400",
              closeButton: "bg-lime-400",
            },
          }
        );
      }}
    />
  );
}
