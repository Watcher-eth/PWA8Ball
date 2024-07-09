// @ts-nocheck

import React, { ReactNode } from "react";
import "@/styles/fonts.css";

import { Button } from "@/components/ui/Button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Drawer,
} from "@/components/ui/drawer";
import {
  Activity,
  Calendar,
  MinusIcon,
  PlusIcon,
  Search,
  Share,
  User,
  UserRoundCheck,
  UserRoundPlus,
  WalletCards,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/Input";
import { Profile, ProfileFragment } from "@lens-protocol/client";
import { Badge } from "@/components/ui/Badge";
import { shortenAddress } from "@thirdweb-dev/react";
import { useProfile } from "@/lib/context/ProfileProvider";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
  profile: ProfileFragment;
}
function ProfileModal({ children, profile }: LayoutProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Vote for me on Blitz",
          text: "Check out Blitz the easiest and most fun way to predict the future with your friends!",
          url: "https://www.tryblitz.xyz",
        });
        console.log("Data was shared successfully");
      } catch (err) {
        console.error("Share failed:");
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      console.log("Web Share not supported on this browser");
    }
  };
  console.log("ehhh", Profile);

  return (
    <div className="flex flex-col">
      <Drawer>
        <DrawerTrigger asChild>
          <motion.div
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.1 }}
            className="mt-[0.1rem]"
          >
            {children}
          </motion.div>
        </DrawerTrigger>
        {profile?.id ? (
          <DrawerContent className=" border-0 rounded-3xl self-center ">
            <div
              className="mx-auto ml-[4vw]  rounded-3xl  mb-5 w-[92vw] relative flex flex-col bg-white text-black  items-center min-h-[40vh]
        "
            >
              <div className="">
                <DrawerHeader className="items-center self-center">
                  <div
                    style={{ zIndex: 5 }}
                    className=" absolute flex top-6 left-[-0.8rem]  w-[90vw] items-center justify-between"
                  >
                    <div />
                    <DrawerClose style={{ zIndex: 5 }}>
                      <motion.div
                        style={{ zIndex: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className=" p-2 left-6 rounded-full bg-gray-100/[0.3]"
                      >
                        <X
                          size={17}
                          className="  stroke-gray-500"
                          strokeWidth={5}
                        />
                      </motion.div>
                    </DrawerClose>
                  </div>
                  <img
                    className="absolute w-[92vw] rounded-t-3xl left-[0rem]  h-[18vh] top-[0rem]"
                    src={
                      profile?.metadata?.coverPicture?.optimized?.uri
                        ? profile?.metadata?.coverPicture?.optimized?.uri
                        : profile?.metadata?.picture?.optimized?.uri
                        ? profile?.metadata?.picture?.optimized?.uri
                        : "https://github.com/shadcn.png"
                    }
                  ></img>
                  <div className="absolute w-[92vw] left-[0rem] rounded-t-3xl backdrop-blur-xl h-[18vh] top-[0rem]"></div>
                  <div className="absolute w-[92vw] left-[0rem] rounded-t-3xl  bg-gradient-to-b  from-transparent via-white/[0.6]  to-white h-[14vh] top-[2.7rem]"></div>
                  <Avatar className="h-28 w-28 ml-[1.45rem] mt-3 relative self-center">
                    <AvatarImage
                      src={
                        profile?.metadata?.picture?.optimized?.uri
                          ? profile?.metadata?.picture?.optimized?.uri
                          : "https://github.com/shadcn.png"
                      }
                    />
                  </Avatar>
                  <DrawerTitle
                    style={{ zIndex: 2 }}
                    className="text-[1.8rem] mr-1  "
                  >
                    {profile?.metadata?.displayName
                      ? profile?.metadata?.displayName
                      : profile?.handle?.localName}
                  </DrawerTitle>
                  <Badge className="rounded-full text-[0.92rem] mx-[0.8rem] h-6 flex  justify-center items-center bg-gray-100">
                    <div>
                      {shortenAddress(profile?.ownedBy?.address, false)}
                    </div>
                  </Badge>
                </DrawerHeader>
              </div>
              <div className="flex justify-between w-[75vw] items-center">
                <div className="flex flex-col items-center">
                  <div className="text-gray-700 text-[1rem] font-bold">
                    Following
                  </div>
                  <div className="text-black text-[1rem]   ">
                    {profile?.stats?.following}
                  </div>
                </div>
                <div className="flex flex-col items-center ">
                  <div className="text-gray-700 text-[1rem] font-bold">
                    Followers
                  </div>
                  <div className="text-black text-[1rem]   ">
                    {profile?.stats?.followers}
                  </div>
                </div>
                <div className="flex flex-col items-center ">
                  <div className="text-gray-700 text-[1rem] font-bold">
                    Accuracy
                  </div>
                  <div className="text-black text-[1rem]   ">32%</div>
                </div>
              </div>
              <DrawerFooter>
                <div className="flex items-center mt-2 w-[80vw]  mb-1 mx-6 justify-between mx-2">
                  <motion.div
                    style={{ zIndex: 11 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                  >
                    <Button
                      style={{ border: "1px solid lightgray" }}
                      className="active:bg-gray-100 space-x-1 flex items-center hover:bg-gray-100 bg-gray-100 text-[1.15rem] text-gray-500 font-bold  h-[2.8rem] rounded-full w-[38vw]"
                    >
                      <Share size={19} className="mt-[0rem]" strokeWidth={3} />
                      <div>Share</div>
                    </Button>
                  </motion.div>

                  <Link href={"/dashboard"}>
                    <motion.div
                      style={{ zIndex: 11 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="active:bg-gray-900 space-x-1 flex items-center hover:bg-gray-900 bg-gray-900 text-[1.15rem] text-white font-bold  h-[2.8rem] rounded-full w-[38vw]">
                        {profile?.handle?.localName ===
                        Profile.handle?.localName ? (
                          <>
                            <Activity
                              size={19}
                              className="mt-[0rem]"
                              strokeWidth={3}
                            />
                            <div>Your Votes</div>
                          </>
                        ) : (
                          <>
                            <UserRoundPlus
                              size={19}
                              className="mt-[0rem]"
                              strokeWidth={3}
                            />
                            <div>Follow</div>
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </DrawerFooter>
            </div>
          </DrawerContent>
        ) : (
          <DrawerContent className=" border-0 rounded-3xl self-center ">
            <div
              className="mx-auto ml-[4vw]  rounded-3xl  mb-5 w-[92vw] relative flex flex-col bg-white text-black  items-center min-h-[40vh]
    "
            >
              <div className="">
                <DrawerHeader className="items-center self-center">
                  <div
                    style={{ zIndex: 5 }}
                    className=" absolute flex top-6 left-[-0rem] ml-5  w-[82vw] items-center justify-between"
                  >
                    <div
                      className="text-[1.7rem] text-white"
                      style={{ fontFamily: "Aeonik-Bold" }}
                    >
                      Sign in
                    </div>
                    <DrawerClose style={{ zIndex: 5 }}>
                      <motion.div
                        style={{ zIndex: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className=" p-2 left-6 rounded-full bg-gray-100/[0.3]"
                      >
                        <X
                          size={17}
                          className="  stroke-white"
                          strokeWidth={6}
                        />
                      </motion.div>
                    </DrawerClose>
                  </div>
                  <img
                    className="absolute w-[92vw] rounded-t-3xl left-[0rem]  h-[19vh] top-[0rem]"
                    src={"https://github.com/shadcn.png"}
                  ></img>
                  <div className="absolute w-[92vw] left-[0rem] rounded-t-3xl backdrop-blur-xl h-[19vh] top-[0rem]"></div>
                  <div className="absolute w-[92vw] left-[0rem] rounded-t-3xl  bg-gradient-to-b  from-transparent via-white/[0.6]  to-white h-[14vh] top-[3.2rem]"></div>
                  <Avatar className="h-[12rem] w-[12rem] ml-[0rem]  mt-3 relative self-center">
                    <AvatarImage
                      src={
                        " https://assets-global.website-files.com/64d69beadfe5074323543ebd/6564ded50242c322ed72422f_Textured-Sphere-1_Mid-Blue2%201.webp"
                      }
                    />
                  </Avatar>
                </DrawerHeader>
              </div>
              <div
                className="text-[1.3rem] text-gray-500 mb-3 mt-[-0.89rem] px-3 text-center leading-6"
                style={{ fontFamily: "Aeonik" }}
              >
                Please sign in to see your Profile and your current predictions
              </div>
              <DrawerFooter>
                <div className="flex items-center mt-[-0.2rem]  mb-3 mx-6 justify-center mx-2">
                  <motion.div
                    style={{ zIndex: 11 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                  >
                  </motion.div>
                </div>
              </DrawerFooter>
            </div>
          </DrawerContent>
        )}
      </Drawer>
    </div>
  );
}
export default ProfileModal;
