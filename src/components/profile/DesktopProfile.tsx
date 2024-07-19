// @ts-nocheck
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useGetLPForUser } from "@/supabase/queries/user/useGetLPForUser";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { DesktopLPModal } from "../Modals/Desktop/DesktopLPModal";
import Link from "next/link";
import { DesktopMyBetModal } from "../common/Charts/MyBetModal";
import { User } from "@/types/UserTypes";
import {
  BarChart,
  Filter,
  SlidersHorizontal,
  Stars,
  TrendingUp,
} from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useUserStore } from "@/lib/stores/UserStore";
import { SocialsSection } from "@/components/common/SocialsSection";
import { useGetTotalFollowers } from "@/supabase/queries/user/useGetTotalFollowers";
import { useGetUserByExternalAuthId } from "@/supabase/queries/user/useGetUserByExternalAuthId";
import { useGetOrdersForUser } from "@/supabase/queries/user/useGetOrdersForUser";
import { aggregatePredictedItems } from "@/utils/predictions/aggregatePredictions";


const chartData = [
  { category: "GTA 6", percentage: 28, fill: "#FF6600" },
  { category: "US Elections", percentage: 42, fill: "#1E90FF" },
];

const chartConfig = {
  percentage: {
    label: "Percentage",
  },
  GTA6: {
    label: "GTA 6",
    color: "#FF6600",
  },
  TaylorSwift: {
    label: "Taylor Swift",
    color: "#FF1493",
  },
} satisfies ChartConfig;

export function DesktopProfile() {
  const { user } = useUserStore();
  const id = "b82fc163-413f-5060-87b1-27b26208e987";
  const { data: totalFollowers } = useGetTotalFollowers(
    user?.external_auth_provider_user_id
  );
  const { data: userC, isLoading } = useGetUserByExternalAuthId(
    user?.external_auth_provider_user_id
  );
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = useGetOrdersForUser(userC?.walletaddress);

  const aggregatedOrdersData = aggregatePredictedItems(ordersData || []);
  const mergedData = [
    ...aggregatedOrdersData.map((item) => ({ ...item, type: "predicted" })),
  ];
  console.log("mergedData", mergedData[0]);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-[#080808]">
      <div className="flex flex-col md:w-1/4 bg-[#131313] rounded-[1.5rem]   p-4 px-8 relative ">
        <img
          src={userC?.pfp}
          alt="Profile Header"
          className="w-full h-10 absolute top-0 left-0 rounded-t-[1.5rem] right-0 object-cover"
        />
        <div className="absolute top-0 left-0 right-0 h-[15%] rounded-[1.5rem] bg-gradient-to-b from-transparent via-[#131313]/80 to-[#131313]" />
        <div className="absolute top-0 left-0 right-0 h-[15%] rounded-[1.5rem] backdrop-blur-lg bg-opacity-50" />
        <div className="flex flex-col items-center mb-4 mt-6 relative">
          <img
            src={userC?.pfp}
            alt="Profile"
            className="rounded-full h-24 w-24 mb-2"
          />
          <h2 className="text-white text-xl font-bold">{userC?.name}</h2>
          <SocialsSection {...userC?.socials} />
        </div>
        <div className="flex justify-between text-white mb-4 px-2">
          <TextWithSuffix value={totalFollowers} suffix="Followers" />
          <TextWithSuffix value={"555"} suffix="Following" />
          <TextWithSuffix value={"12"} suffix="Predictions" />
        </div>
        <div className="flex justify-between mb-4 space-x-4">
          <ContrastButton label="Follow" />
          <ContrastButton label="Edit" />
        </div>
        <div>
          <Card className="bg-[transparent]  border-1 border-[#212121]">
            <CardHeader className="items-center pb-0">
              <CardTitle className="text-white">
                {userC?.name}'s Accuracy
              </CardTitle>
              <CardDescription className="text-gray-400">
                15th July
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1  pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square  max-h-[250px]"
              >
                <RadialBarChart
                  data={chartData}
                  startAngle={0}
                  endAngle={360}
                  innerRadius={83}
                  outerRadius={110}
                >
                  <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-[#151515]"
                    polarRadius={[50, 70, 90]}
                  />
                  <RadialBar
                    dataKey="percentage"
                    background
                    cornerRadius={10}
                  />
                  <PolarRadiusAxis
                    className="bg-[transparent]"
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  >
                    <Label
                      className="bg-[transparent]"
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          const totalPercentage = chartData.reduce(
                            (sum, entry) => sum + entry.percentage,
                            0
                          );
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-white text-4xl font-bold"
                              >
                                {totalPercentage}%
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-gray-400"
                              >
                                Accuracy
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div className="leading-none text-gray-400">
                Showing accuracy for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="flex flex-col md:w-2/4 bg-[#131313] rounded-[1.5rem] p-8">
        <div className="w-full flex flex-row justify-between ">
          <div>
            <h2 className="text-white text-2xl font-semibold">
              {user?.name}'s Predictions
            </h2>
            <h2 className="text-[#909090] text-md font-[500] mb-3">
              Active Predictions{" "}
            </h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="px-2 p-4 h-8 bg-[#181818] flex justify-center items-center rounded-full">
                <SlidersHorizontal
                  className="h-5 w-5"
                  color="white"
                  strokeWidth={2.8}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#303030]/60 mr-2 mt-2 text-white z-20 rounded-md backdrop-blur-lg border-2 w-full border-[#323232]">
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

        <div className="grid grid-cols-3 gap-0">
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
              <div
                key={index}
                className={`
                relative size-[20vh] bg-cover bg-center rounded-lg shadow-lg
                active:scale-99 hover:scale-101
              `}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-black opacity-30 rounded-[1.5rem]"></div>

                <div className="absolute bottom-0   p-4 text-white">
                  <span className="bg-green-500/70 backdrop-blur-lg text-xs font-semibold uppercase px-2 py-1 rounded-full">
                    {item.type === "predicted" ? "Active" : "Correct"}
                  </span>
                </div>
              </div>
            </DesktopMyBetModal>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:w-1/4  ">
        <div className="mb-4 bg-[#131313] rounded-lg p-5 pb-4 ">
          <div className="inline-block">
            <h2 className="text-white text-xl font-bold">
              Resolved Predictions
            </h2>
            <h2 className="text-[#909090] text-sm">
              2 Predictions ready to redeem
            </h2>
          </div>
          <Stars
            className="inline-block -mt-8 ml-2 -mr-2 transform rotate-12	 text-white"
            strokeWidth={3}
          />

          {mergedData?.map((item, index) => {
            if (index < 3)
              return (
                <Link href={`/p/${item.market_id}`}>
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
  return (
    <div className="bg-[#121212] rounded-[1.5rem] min-h-[53vh] p-5 pt-6">
      <div className="mb-4">
        <div className="flex items-between mb-4">
          {/* <div className="bg-[#171717] h-24 w-24 rounded-lg"></div> */}
          <div className="text-white">
            <div className="-space-y-1">
              <p className="text-[#909090] text-[0.7rem]">Total locked</p>
              <h2 className="text-xl font-bold ">$17.56</h2>
            </div>
            <div className="flex justify-between space-x-3 text-sm mt-1">
              <div className="-space-y-1 mr-2">
                <p className="text-[#909090] text-[0.7rem] ">Fees earned</p>
                <p className="font-bold text-[1rem]">$0.00</p>
              </div>
              <div className=" -space-y-1">
                <p className="text-[#909090] text-[0.7rem]">Cred earned</p>
                <p className="font-bold text-[1rem]">230 Cred</p>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-white flex flex-row items-center text-lg font-semibold mb-4">
          <BarChart strokeWidth={2.8} className="h-[1.13rem] " color="white" />{" "}
          Your active Boosts
        </h3>
        <div className="space-y-4">
          {filteredPositions?.map((item, index) => {
            return (
              <DesktopLPModal
                image={item?.image}
                title={item?.title}
                amount={item?.amount}
                id={item?.id}
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
                    <p className="text-[#909090] text-[0.84rem]">
                      Boost amount ${(item.amount / 10 ** 6).toFixed(2)}
                    </p>
                    <p className="text-white text-[1rem] font-[500] line-clamp-1">
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              </DesktopLPModal>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export function DesktopProfileSide(props: {
  userC: User;
  totalFollowers: number;
}) {
  const { userC, totalFollowers } = props;
  return (
    <div className="flex flex-col md:w-1/4 bg-[#131313] rounded-[1.5rem]   p-4 px-8 relative ">
      <img
        src={userC?.pfp}
        alt="Profile Header"
        className="w-full h-10 absolute top-0 left-0 rounded-t-[1.5rem] right-0 object-cover"
      />
      <div className="absolute top-0 left-0 right-0 h-[15%] rounded-[1.5rem] bg-gradient-to-b from-transparent via-[#131313]/80 to-[#131313]" />
      <div className="absolute top-0 left-0 right-0 h-[15%] rounded-[1.5rem] backdrop-blur-lg bg-opacity-50" />
      <div className="flex flex-col items-center mb-4 mt-6 relative">
        <img
          src={userC?.pfp}
          alt="Profile"
          className="rounded-full h-24 w-24 mb-2"
        />
        <h2 className="text-white text-xl font-bold">{userC?.name}</h2>
        <SocialsSection {...userC?.socials} />
      </div>
      <div className="flex justify-between text-white mb-4 px-2">
        <TextWithSuffix value={totalFollowers} suffix="Followers" />
        <TextWithSuffix value={"555"} suffix="Following" />
        <TextWithSuffix value={"12"} suffix="Predictions" />
      </div>
      <div className="flex justify-between mb-4 space-x-4">
        <ContrastButton label="Follow" />
        <ContrastButton label="Edit" />
      </div>
      <div>
        <Card className="bg-[transparent]  border-1 border-[#212121]">
          <CardHeader className="items-center pb-0">
            <CardTitle className="text-white">
              {userC?.name}'s Accuracy
            </CardTitle>
            <CardDescription className="text-gray-400">
              15th July
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1  pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square  max-h-[250px]"
            >
              <RadialBarChart
                data={chartData}
                startAngle={0}
                endAngle={360}
                innerRadius={83}
                outerRadius={110}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-[#151515]"
                  polarRadius={[50, 70, 90]}
                />
                <RadialBar dataKey="percentage" background cornerRadius={10} />
                <PolarRadiusAxis
                  className="bg-[transparent]"
                  tick={false}
                  tickLine={false}
                  axisLine={false}
                >
                  <Label
                    className="bg-[transparent]"
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        const totalPercentage = chartData.reduce(
                          (sum, entry) => sum + entry.percentage,
                          0
                        );
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-white text-4xl font-bold"
                            >
                              {totalPercentage}%
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-gray-400"
                            >
                              Accuracy
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month{" "}
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div className="leading-none text-gray-400">
              Showing accuracy for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function TextWithSuffix({ value, suffix }: { value: number; suffix: string }) {
  return (
    <div className="text-center">
      <p className="font-bold">{value}</p>
      <p className="text-[#909090]">{suffix}</p>
    </div>
  );
}

function ContrastButton({
  label,
  className = "",
}: {
  label: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        w-1/2 h-10 font-semibold text-[0.95rem] text-white bg-[#212121]
        flex justify-center items-center rounded-md
        hover:scale-102 active:scale-98
        ${className}
      `}
    >
      {label}
    </div>
  );
}
