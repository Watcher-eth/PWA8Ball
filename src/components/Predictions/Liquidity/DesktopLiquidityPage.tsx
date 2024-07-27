// @ts-nocheck

import { useRouter } from "next/router";
import { useUserStore } from "@/lib/stores/UserStore";
import {
  DesktopLiquidityPosition,
  LiquidityPosition,
} from "./LiquidityPosition";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useGetLPForUser } from "@/supabase/queries/user/useGetLPForUser";
import { NewPlaceholderLp } from "@/components/common/Placeholders/NewPlaceholders";

export function DesktopLiquidityPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const {
    data: positions,
    isLoading,
    refetch,
  } = useGetLPForUser(user?.walletaddress);

  const filteredPositions = positions?.filter((item) => item.amount > 0) ?? [];

  return (
    <div className="pt-10 flex flex-col h-full min-h-screen bg-[#080808] w-full ">
      <div className="flex flex-col -space-y-3 px-10">
        <div className="flex flex-row items-baseline">
          <div className="text-white text-[3.5rem] font-semibold font-[Aeonik-Bold]">
            $12.345,00
          </div>
          <div className="text-[lightgray] text-2xl ml-2 mb-3  font-[Aeonik]">
            +12.5%
          </div>
        </div>
        <div className="text-[lightgray] text-xl  font-[Aeonik]">
          Your cummulative boosts
        </div>
      </div>
      <div className="h-[30%]">
        <DesktopLPChart />
      </div>
      <div className="text-[white] text-2xl  mb-4  px-10 font-[Aeonik-Bold]">
        Your Boosts
      </div>
      <div className="px-10">
        {filteredPositions?.length > 0 ? (
          <div className="pb-5 grid-cols-3 row-span-3 grid grid-flow-col gap-4">
            {filteredPositions.map((item, index: number) => (
              <DesktopLiquidityPosition
                key={index}
                amount={item.amount / 10 ** 6}
                image={item.image}
                title={item.title}
                id={item.marketId}
              />
            ))}
          </div>
        ) : (
          <div className="overflow-y-scroll">
            <NewPlaceholderLp isUser={true} />
          </div>
        )}
      </div>
    </div>
  );
}

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function DesktopLPChart() {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="border-0 h-[35vh] px-4 my-10 ">
      <CardContent>
        <ChartContainer className="h-[35vh] w-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="#ffffff"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="#212121"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
