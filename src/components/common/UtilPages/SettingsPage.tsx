import { Switch } from "@/components/ui/switch";
import {
  ChevronRight,
  CircleArrowLeft,
  CreditCard,
  Receipt,
  ReceiptText,
  Save,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

export const SettingsPage: React.FC = () => {
  const initialSettings = {
    pushNotifications: false,
    personalizedRecommendations: false,
    publicProfile: false,
  };

  const [settings, setSettings] = useState(initialSettings);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const chartData = [
    { browser: "safari", visitors: 12, fill: "var(--color-safari)" },
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    const hasChanges =
      settings.pushNotifications !== initialSettings.pushNotifications ||
      settings.personalizedRecommendations !==
        initialSettings.personalizedRecommendations ||
      settings.publicProfile !== initialSettings.publicProfile;

    setShowSaveButton(hasChanges);
  }, [settings]);

  const handleSwitchChange = (key: keyof typeof settings, value: boolean) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  return (
    <div className="container p-4 bg-[#181818] w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="order-last bg-[#080808] space-y-9 flex flex-col md:order-first p-5 relative">
          <div className="text-white font-semibold text-2xl">Settings</div>
          <div className="w-full p-4 rounded-md bg-[#151515] flex flex-row items-center justify-between">
            <div className="text-white text-[0.95rem]">Your Profile</div>
            <div className="text-white text-[0.85rem] px-3 p-1 bg-[#262626] rounded-md">
              Edit
            </div>
          </div>
          <div className="flex flex-col px-4 bg-[#151515] rounded-md">
            <div className="w-full py-4 flex flex-row items-center justify-between">
              <div className="text-white text-[0.95rem]">
                Push Notifications
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(value) =>
                  handleSwitchChange("pushNotifications", value)
                }
                className="bg-[#212121]"
              />
            </div>
            <div className="h-[0.1rem] w-full  bg-[#212121]" />
            <div className="w-full py-4 flex flex-row items-center justify-between">
              <div className="text-white text-[0.95rem]">
                Personalized Recommendations
              </div>
              <Switch
                checked={settings.personalizedRecommendations}
                onCheckedChange={(value) =>
                  handleSwitchChange("personalizedRecommendations", value)
                }
                className="bg-[#212121]"
              />
            </div>
            <div className="h-[0.1rem] w-full  bg-[#212121]" />
            <div className="w-full py-4 flex flex-row items-center justify-between">
              <div className="text-white text-[0.95rem]">Public Profile</div>
              <Switch
                checked={settings.publicProfile}
                onCheckedChange={(value) =>
                  handleSwitchChange("publicProfile", value)
                }
              />
            </div>
          </div>
          <div className="flex flex-col px-4 bg-[#151515] rounded-md">
            <div className="w-full py-4  flex flex-row items-center justify-between">
              <div className="text-white text-[0.95rem]">Privacy</div>
              <ChevronRight className="text-white h-[1rem]" strokeWidth={3} />
            </div>
            <div className="h-[0.1rem] w-full  bg-[#212121]" />
            <div className="w-full py-4  flex flex-row items-center justify-between">
              <div className="text-white text-[0.95rem]">Terms of Service</div>
              <ChevronRight className="text-white h-[1rem]" strokeWidth={3} />
            </div>
            <div className="h-[0.1rem] w-full  bg-[#212121]" />
            <div className="w-full py-4  flex flex-row items-center justify-between">
              <div className="text-white text-[0.95rem]">Region</div>
              <div className="text-white text-[0.85rem] px-3 p-1 bg-[#262626] rounded-md">
                USA 🇺🇸
              </div>
            </div>
          </div>
          <div className="p-7 bg-[#151515] rounded-md flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="text-lg text-white font-semibold">
                Invite your friends and earn cred
              </div>
              <div className="text-md max-w-[55a%] text-[lightgray]">
                Invite your friends to 8Ball and receive cred every time they
                make a prediction. For life!
              </div>
              <div className="h-[0.1rem] mt-2 my-3 w-full  bg-[#212121]" />
              <div className="flex flex-row space-x-3 items-center">
                <button className="px-3 text-white text-md flex items-center justify-center py-1 rounded-full bg-[#262626]">
                  Invite Friends
                </button>
                <div className="text-md text-[#909090]">0 referrals</div>
              </div>
            </div>
            <CardContent className="flex-1 w-[30%] pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <RadialBarChart
                  data={chartData}
                  startAngle={0}
                  endAngle={250}
                  innerRadius={80}
                  outerRadius={110}
                >
                  <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    polarRadius={[86, 74]}
                  />
                  <RadialBar dataKey="visitors" background cornerRadius={10} />
                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                                className="fill-foreground text-4xl font-bold"
                              >
                                {chartData[0].visitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Visitors
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
          </div>
          {showSaveButton && (
            <button
              onClick={() => {
                // Handle save action here
                setShowSaveButton(false); // Hide the save button after saving
              }}
              className=" bottom-4 right-4 bg-[#181818] text-white justify-center font-semibold flex flex-row items-center px-4 py-2 rounded-md"
            >
              <Save className="h-[1rem]" strokeWidth={2.5} /> Save
            </button>
          )}
        </div>
        <div className="order-first md:order-last bg-[#080808] p-4">
          <div className="flex flex-col rounded-md bg-[#181818] p-5 px-8">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-col -space-y-2">
                <div className="text-white text-[2rem] font-bold">$356.00</div>
                <div className="text-white text-[1rem] font-semibold">
                  Your balance
                </div>
              </div>
              <div className="flex flex-col w-[30%] mt-3">
                <div className="flex flex-row space-x-1">
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                </div>
                <div className="text-green-300 text-[1rem] mt-1 font-semibold">
                  7 active predicitions
                </div>
              </div>
            </div>
            <div className="h-[0.1rem] w-full mb-4 mt-6 bg-[#212121]" />
            <div className="flex flex-row items-center justify-between">
              <div className="text-[lightgray] text-[1rem] mt-1 font-[500]">
                Joined May 2024
              </div>
              <div className="flex flex-row space-x-3 items-center">
                <button className="px-3 flex-row font-semibold text-white text-md flex items-center justify-center py-1 rounded-md bg-[#262626]">
                  <ReceiptText
                    className="h-[0.9rem] text-white"
                    strokeWidth={2.5}
                  />
                  Prediction History
                </button>
                <button className="px-3 flex-row font-semibold text-white text-md flex items-center justify-center py-1 rounded-md bg-[#262626]">
                  <CreditCard
                    className="h-[0.9rem] text-white"
                    strokeWidth={2.5}
                  />
                  Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
