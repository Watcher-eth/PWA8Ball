// @ts-nocheck

import React, { useState } from "react";
import debounce from "lodash/debounce";
import { useQuery } from "@tanstack/react-query";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "../ui/drawer";
import {
  Calendar,
  MinusIcon,
  PlusIcon,
  Search,
  User,
  WalletCards,
  X,
} from "lucide-react";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";

import { RandomMemoji } from "../Common/MemojiAvatar";
import { shortenAddress } from "@thirdweb-dev/react";
import YourVotes, { YourSubmission } from "../Activity/YourVotes";

function SearchModal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const debouncedSearch = debounce((query) => {
    setDebouncedSearchQuery(query);
  }, 500); // Adjust the debounce time as needed

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchResults", debouncedSearchQuery],
    enabled: !!debouncedSearchQuery,
    queryFn: async () => {
      try {

      } catch (error) {
        throw new Error("Error fetching search results");
      }
    },
  });
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  //Modal State
  //Search State
  //Search Profiles Query

  return (
    <div className="flex flex-col">
      <Drawer>
        <DrawerTrigger asChild>
          <motion.div whileTap={{ scale: 0.96 }} className="mt-[0.1rem]">
            <Search strokeWidth={3} className="h-7 text-white w-7" />
          </motion.div>
        </DrawerTrigger>
        <DrawerContent className="border-0 items-start ">
          <div className="flex flex-col bg-white rounded-3xl p-3  mx-[3vw] mb-5 w-[92vw] relative">
            <div
              style={{ zIndex: 5 }}
              className=" flex mx-2  pt-3  w-[90vw] items-center justify-between"
            >
              <DrawerTitle className="text-[1.9rem]  text-black">
                Search
              </DrawerTitle>
              <DrawerClose style={{ zIndex: 5 }}>
                <motion.div
                  style={{ zIndex: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className=" p-2 mr-8  rounded-full bg-gray-100"
                >
                  <X size={17} className="  stroke-gray-400" strokeWidth={5} />
                </motion.div>
              </DrawerClose>
            </div>
            <div className="mx-auto flex flex-col bg-white text-black w-full   max-w-sm">
              <div className="flex items-center ml-1">
                <Search
                  className="mr-[-2.4rem] left-[0.7rem] top-[0.635rem] relative"
                  size={19}
                  strokeWidth={2}
                />
                <Input
                  onChange={handleChange}
                  style={{ border: "1px solid lightgray" }}
                  placeholder="Who are you looking for..."
                  className="text-[1.25rem]  ml-5 mt-5 pl-9 w-[83vw]   py-6  rounded-xl
                 self-start"
                ></Input>
              </div>
              <div className=" self-center">
                <div className="flex flex-col items-center h-[40vh] mt-3 overflow-y-scroll p-2">
                  {searchResults?.length > 0 && !undefined ? (
                    searchResults?.map((profile, index) => (
                      <div
                        key={index}
                        className="flex w-[90vw] flex items-center my-2"
                      >
                        {profile.metadata?.picture?.optimized?.uri ? (
                          <Avatar className="h-14 w-14 rounded-full">
                            <AvatarImage
                              src={profile.metadata?.picture?.optimized?.uri}
                              alt={`Avatar for ${profile.metadata?.displayName}`}
                              className="h-14 w-14 rounded-full"
                            />
                          </Avatar>
                        ) : (
                          <RandomMemoji height={3.6} width={3.6} />
                        )}
                        <div className="flex flex-col">
                          <div className="text-[1.2rem] ml-2 ">
                            {profile?.metadata?.displayName
                              ? profile?.metadata?.displayName
                              : profile?.handle?.localName}
                          </div>
                          <div className="text-[1.2rem] text-gray-200 ml-2 ">
                            {shortenAddress(profile?.ownedBy?.address)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="overflow-hidden">
                      <CurrentContest />
                      <LeaderboardButton />

                      <div className="p-4 pb-0"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
export default SearchModal;

function CurrentContest() {
  return (
    <div
      style={{ borderRadius: "14px" }}
      className="w-[86vw] bg-gray-100 self-center mt-5flex flex-col mx-3  py-2 px-3"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-start flex-col">
          <div className="text-[1.25rem] ml-1 font-bold text-[#262626]">
            Lens Frens Challenge
          </div>
          <div className="text-[1.1rem] my-1 items-center flex text-gray-500">
            <User className="h-[1.2rem] mr-1  w-[1.2rem]" />
            <div>86 Participants</div>
          </div>
          <div className="text-[1.1rem] flex items-center text-gray-500">
            <Calendar className="h-[1.2rem] mr-1  w-[1.2rem]" />

            <div>3 days left</div>
          </div>
        </div>
        <div
          style={{ borderRadius: "10px" }}
          className="h-[27vw] w-[27vw] mt-2 rounded-md bg-[#262626] relative"
        >
          <img objectFit="fill" src="" />
        </div>
      </div>
      <motion.div
        className="bg-[#262626]  flex items-center justify-center mt-4 mb-2"
        whileTap={{ scale: 0.95 }}
        style={{ borderRadius: "8px" }}
      >
        <Button className="bg-[#262626] font-bold text-white ">Join Now</Button>
      </motion.div>
    </div>
  );
}

function LeaderboardButton() {
  return (
    <Link href={"/activity"}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        style={{ borderRadius: "14px" }}
        className="w-[86vw] bg-gray-100 self-center mt-4  items-center justify-between flex mx-3  py-2 px-3"
      >
        <div className="flex-col space-y-[-0.3rem]">
          <div className="text-[1.20rem] ml-1 font-bold text-[#262626]">
            Leaderboard
          </div>
          <div className="text-[1.05rem] ml-1  text-gray-500">
            See the global leaderboard
          </div>
        </div>
        <div className="flex space-x-[-1rem] items-center">
          <Avatar>
            <AvatarImage src="https://ik.imagekit.io/buttrfly/tr:n-avatar/https://gw.ipfs-lens.dev/ipfs/bafkreianwlir2groq5l52zdnikon4rtgjcostjosaadbbfekgpzhaprmri" />
          </Avatar>
          <Avatar>
            <AvatarImage src="https://ik.imagekit.io/buttrfly/tr:n-avatar/https://cdn.stamp.fyi/avatar/0x1A4b0923B0F150b5Fa8CdFb2138D0D78b1EC85fC?s=140" />
          </Avatar>
          <Avatar className="border-1 border-white">
            <AvatarImage src="https://ik.imagekit.io/buttrfly/tr:n-avatar/https://cdn.stamp.fyi/avatar/0xAf153E755F59BB62ba8A5b7e5FfDB71c0aC43305?s=140" />
          </Avatar>
        </div>
      </motion.div>{" "}
    </Link>
  );
}
