import React, { useState } from "react";
import ProfileModal from "../Common/ProfileModal";
import { Avatar, AvatarImage } from "../ui/avatar";
import YourSubmission from "./YourSubmission";
import YourFriends from "./YourFriends";
import GlobalLeaderboard from "./GlobalLeaderboard";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import "../../styles/fonts.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ActivityPage() {
  const [activeSegment, setActiveSegment] = useState<boolean>(true);
  console.log(activeSegment);
  return (
    <div className="mt-10 mb-3  bg-[#0E0E0E] flex flex-col items-center  h-[100vh] ">
      <Jackpot address="" />
      <Tabs defaultValue="friends" className="w-[300px]">
        <TabsList className="grid w-full grid-cols-2 space-x-[-1.4rem]">
          <TabsTrigger value="friends" className="text-gray-300 text-[1.15rem]">
            Your Friends
          </TabsTrigger>
          <TabsTrigger
            value="leaderboard"
            className="text-gray-300 text-[1.15rem]"
          >
            Leaderboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="friends">
          <YourFriends />
        </TabsContent>
        <TabsContent value="leaderboard">
          <GlobalLeaderboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ActivityPage;

//TODO: Import fonts
export function Jackpot(props: { address: string }) {
  //TODO: Call contest and get balance

  return (
    <div className="flex flex-col bg-[#0E0E0E] mt-8 space-y-[-1.5rem] items-center self-center  p-3 mb-4">
      <div
        className="text-white text-[4rem]"
        style={{ fontFamily: "Benzin-Bold" }}
      >
        1025
      </div>
      <div
        className="text-gray-200 text-[1.15rem]"
        style={{ fontFamily: "Aeonik-Bold" }}
      >
        Current Jackpot
      </div>
    </div>
  );
}
