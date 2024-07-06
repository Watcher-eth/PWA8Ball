// @ts-nocheck

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";

import {
  Pencil,
  EllipsisVertical,
  PieChart,
  Twitter,
  CircleEllipsis,
} from "lucide-react";

import { useGetUserByExternalAuthId } from "@/lib/supabase/queries/user/useGetUserByExternalAuthId";
import { useGetTotalFollowers } from "@/lib/supabase/queries/user/useGetTotalFollowers";
import { useUserBalance } from "@/lib/hooks/useUserBalance";

import { GeneralFeed } from "@/components/profile/GeneralFeed";
import { FollowButton } from "@/components/profile/FollowButton";

import { AltSkeleton } from "@/components/ui/Skeleton_";




export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  return {
    props: {
      userId: id,
    },
  };
};

export default function ProfilePage({
  userId,
}: {
  userId: string;
}) {
  const router = useRouter();
  const { id: userID } = router.query; // Get the userId from the URL

  const [edit, setEdit] = useState<boolean>(false);
  const { data: totalFollowers } = useGetTotalFollowers(userID);
  const { data: userC } = useGetUserByExternalAuthId(userID);

  const { balance, isLoading } = useUserBalance({
    userAddress: userC?.walletaddress,
  });


  return (
    <div className="flex flex-col items-center min-h-screen bg-[#101010] relative">
      <div className="w-full relative">
        <img
          src={userC?.pfp}
          alt="Profile Header"
          className="w-full h-[250px] object-cover"
        />
        <div className="absolute top-0 left-0 right-0 h-[250px] bg-gradient-to-b from-transparent via-[#101010]/80 to-[#101010]" />
        <div className="absolute top-0 left-0 right-0 h-[250px] backdrop-blur-lg bg-opacity-50" />
      </div>

      <div className="w-full flex flex-col items-center pt-1 top-[-13rem] relative">
        <Link href="/lp">
          <div className="absolute top-6 left-6 p-2 bg-[rgba(22, 22, 22, 0.5)] backdrop-blur-lg rounded-[25px]">
            <PieChart size={19} color="white" strokeWidth={3} />
          </div>
        </Link>

        <div
          className="absolute top-5 right-6 p-2 bg-[rgba(22, 22, 22, 0.5)] backdrop-blur-lg rounded-[25px]"
        >
          <CircleEllipsis size={19} color="white" strokeWidth={3} />
        </div>

        <img
          src={userC?.pfp}
          className="h-[5rem] w-[5rem] rounded-full border-4 border-[#202020] "
          alt="Profile"
        />
        <div className="text-white text-sm absolute top-[4rem] p-1 bg-[#202020] rounded-full font-bold mt-3">
          0%
        </div>
        <p className="text-white text-xl font-bold mt-6">{userC?.name}</p>

        <div className="flex flex-col items-center mt-0">
          {userC?.socials?.twitter ? (
            <div className="flex items-center mt-0">
              <Twitter className="h-4 text-gray-200" />
              <p
                style={{ fontWeight: 500 }}
                className="text-gray-200 text-md font-bold ml-1"
              >
                @{userC?.socials?.twitter?.username}
              </p>
            </div>
          ) : userC?.socials?.farcaster ? (
            <div className="font-medium flex items-center mt-0">
              <img src="/farcaster.png" className="h-10 w-10" alt="Farcaster" />
              <p className="text-gray-200 text-lg font-medium  ml-1">
                @{userC?.socials?.farcaster?.name}
              </p>
            </div>
          ) : null}
          <div className="font-medium flex items-center mt-2">
            {isLoading ? (
              <div className="mr-[7px]">
                <AltSkeleton className="h-[33px] w-[75px]" />
              </div>
            ) : (
              <p className="text-gray-100 text-sm bg-[#1B1B1E] py-[0.5rem] px-4 rounded-2xl">
                ${balance.toFixed(2)}
              </p>
            )}
            <p className="text-gray-100 text-sm mr-2 bg-[#1B1B1E] py-[0.5rem] px-4 rounded-2xl ml-2 font-medium">
              {totalFollowers} Followers
            </p>
            <FollowButton
              setEdit={() => setEdit(true)}
              profileId={userC?.external_auth_provider_user_id}
              isUser={false}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center mt-[-12.5rem]">
        <GeneralFeed
          handleOpenBottomSheet={(props) => console.log(props)}
          walletAddy={userC?.walletaddress}
          id={userId}
          onParentRefresh={() => console.log("Refreshed!")}
        />
      </div>

      <div className="h-24" />

      {/* {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />} */}
    </div>
  );
};
