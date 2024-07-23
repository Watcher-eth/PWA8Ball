// @ts-nocheck
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Calendar, Search, User, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/Button";

import { RandomMemoji } from "../common/MemojiAvatar";
import { shortenAddress } from "@/utils/address/shortenAddress";
import { ACTIVITY_PATH } from "@/utils/urls";
import { useDebounceValue } from "usehooks-ts";

export function SearchModal() {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useDebounceValue("", 300)


  function handleChange(event) {
    setDebouncedSearchQuery(event.target.value);
  };

  const {
    data: searchResults,
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


  return (
    <div className="flex flex-col">
      <Drawer>
        <DrawerTrigger asChild>
          <div className="mt-[0.1rem] active:scale-96 transition-all">
            <Search strokeWidth={3} className="h-7 text-white w-7" />
          </div>
        </DrawerTrigger>
        <DrawerContent className="border-0 items-start ">
          <div className="flex flex-col bg-white rounded-3xl p-3  mx-[3vw] mb-5 w-[92vw] relative">
            <div
              className=" flex mx-2 pt-3 w-[90vw] items-center justify-between z-[5]"
            >
              <DrawerTitle className="text-[1.9rem]  text-black">
                Search
              </DrawerTitle>
              <DrawerClose className="z-[5]">
                <div
                  className={`
                    z-[5] p-2 mr-8  rounded-full bg-gray-100
                    active:scale-90 transition-all
                  `}
                >
                  <X size={17} className="stroke-gray-400" strokeWidth={5} />
                </div>
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
                  placeholder="Who are you looking for..."
                  className={`
                    text-[1.25rem] ml-5 mt-5 pl-9 w-[83vw] py-6 rounded-xl
                    self-start border border-[lightgray]
                  `}
                ></Input>
              </div>
              <div className=" self-center">
                <div className="flex flex-col items-center h-[40vh] mt-3 overflow-y-scroll p-2">
                  {searchResults?.length > 0 && !undefined ? (
                    searchResults?.map((profile, index) => (
                      <div
                        key={index}
                        className="flex w-[90vw] items-center my-2"
                      >
                        {profile.metadata?.picture?.optimized?.uri ? (
                          <Avatar className="h-14 w-14 rounded-full">
                            <AvatarImage
                              src={profile.metadata?.picture?.optimized?.uri}
                              alt={`Avatar for ${profile.metadata?.displayName}`}
                              className="size-14 rounded-full"
                            />
                          </Avatar>
                        ) : (
                          <RandomMemoji height={3.6} width={3.6} />
                        )}
                        <div className="flex flex-col">
                          <div className="text-[1.2rem] ml-2 ">
                            {profile?.metadata?.displayName ??
                              profile?.handle?.localName}
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

function CurrentContest() {
  return (
    <div className="w-[86vw] bg-gray-100 self-center mt-5 flex flex-col mx-3  py-2 px-3 rounded-[14px]">
      <div className="flex justify-between items-center">
        <div className="flex items-start flex-col">
          <div className="text-[1.25rem] ml-1 font-bold text-[#262626]">
            Lens Frens Challenge
          </div>
          <div className="text-[1.1rem] flex  items-center text-gray-500 my-1">
            <User className="size-[1.2rem] mr-1" />
            <div>86 Participants</div>
          </div>
          <div className="text-[1.1rem] flex items-center text-gray-500">
            <Calendar className="size-[1.2rem] mr-1" />
            <div>3 days left</div>
          </div>
        </div>
        <div className="size-[27vw] mt-2 rounded-md bg-[#262626] relative">
          <img objectFit="fill" src="" />
        </div>
      </div>
      <div
        className={`
          bg-[#262626]  flex items-center justify-center mt-4 mb-2
          transition-all rounded-md active:scale-95
        `}
      >
        <Button className="bg-[#262626] font-bold text-white ">Join Now</Button>
      </div>
    </div>
  );
}

function LeaderboardButton() {
  return (
    <Link href={ACTIVITY_PATH}>
      <div
        className={`
          w-[86vw] bg-gray-100 rounded-lg
          flex self-center items-center justify-between
          mx-3 mt-4 py-2 px-3
          active:scale-95 hover:scale-101 transition-all
        `}
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
          <Avatar className="border border-white">
            <AvatarImage src="https://ik.imagekit.io/buttrfly/tr:n-avatar/https://cdn.stamp.fyi/avatar/0xAf153E755F59BB62ba8A5b7e5FfDB71c0aC43305?s=140" />
          </Avatar>
        </div>
      </div>{" "}
    </Link>
  );
}
