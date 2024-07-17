// @ts-nocheck

import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Twitter, CircleEllipsis } from "lucide-react";
import { getUSDCBalance } from "@/lib/onchain/contracts/Usdc";
import { useGetUserByExternalAuthId } from "@/supabase/queries/user/useGetUserByExternalAuthId";
import { useGetTotalFollowers } from "@/supabase/queries/user/useGetTotalFollowers";
import { GeneralFeed } from "@/components/profile/GeneralFeed";
import { FollowButton } from "@/components/profile/FollowButton";
import { skeletonVariants } from "@/components/ui/Skeleton";
import { SocialsSection } from "@/components/common/SocialsSection";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  return {
    props: {
      userId: id,
    },
  };
};

export default function ProfilePage({ userId }: { userId: string }) {
  const [edit, setEdit] = useState(false);
  const { data: totalFollowers } = useGetTotalFollowers(userId);
  const { data: userC, isLoading } = useGetUserByExternalAuthId(userId);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [userCBalance, setUserBalance] = useState(0);

  async function getUserBalances() {
    const balance = await getUSDCBalance(userC?.walletaddress);
    setBalanceLoading(false);
    setUserBalance(Number(balance));

    return balance;
  }

  useEffect(() => {
    const balance = getUserBalances();
  }, []);


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
          <AbsoluteBlurIcon IconComponent={PieChart} className="top-6 left-6"/>
        </Link>
        <AbsoluteBlurIcon IconComponent={CircleEllipsis} className="top-5 right-6"/>
        <img
          src={userC?.pfp}
          className="size-[5rem] rounded-full border-4 border-[#202020] "
          alt="Profile"
        />
        <div className="text-white text-sm absolute top-[4rem] p-1 bg-[#202020] rounded-full font-bold mt-3">
          0%
        </div>
        <p className="text-white text-xl font-bold mt-6">{userC?.name}</p>

        <div className="flex flex-col items-center mt-0">
          <SocialsSection {...userC?.socials} />
          <div className="flex items-center mt-2 font-medium">
            {balanceLoading ? (
              <div style={{ marginRight: 7 }}>
                <motion.div
                  className="h-[33px] w-[75px] bg-[#252525] rounded-xl"
                  variants={skeletonVariants}
                  initial="initial"
                  animate="pulse"
                />
              </div>
            ) : (
              <p className="text-gray-100 text-sm bg-[#1B1B1E] py-2 px-4 rounded-2xl">
                ${(userCBalance / 10 ** 6).toFixed(2)}
              </p>
            )}
            <p className="text-gray-100 text-sm bg-[#1B1B1E] py-2 px-4 rounded-2xl mx-2 font-medium">
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

      <div className="w-full flex flex-col items-center -mt-[200px]">
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
}

function AbsoluteBlurIcon({
  IconComponent,
  className=""
}: {
  IconComponent: React.FC,
  className?: string
}) {
  return (
    <div
      className={`
        absolute p-2 bg-[rgba(22, 22, 22, 0.5) backdrop-blur-lg rounded-[25px]
        ${className}
      `}
    >
      <IconComponent size={19} color="white" strokeWidth={3} />
    </div>
  )
}