// @ts-nocheck

import { GetServerSideProps, Metadata, ResolvingMetadata } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, PieChart, Twitter } from "lucide-react";
import { useUserStore } from "@/lib/stores/UserStore";
import { useGetTotalFollowers } from "@/lib/supabase/queries/user/getTotalFollowers";
import GeneralFeed from "@/components/profile/GeneralFeed";
import LoginModal from "@/components/Modals/LoginModal";
import { useGetUserByExternalAuthId } from "@/lib/supabase/queries/user/getUserById";
import Head from "next/head";
import { supabase } from "@/lib/supabase/supabaseClient";
import { NextSeo } from "next-seo";
import { getApiOgRouteUrl, getProfileUrl } from "@/utils/urls";

interface ProfilePageProps {
  userId: string;
}

interface Props1 {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props1,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  // Fetch topic data from Supabase
  // Fetch user data from Supabase
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("external_auth_provider_user_id", id)
    .single();

  if (error) {
    console.error(error);
  }
  const ogUrl = getApiOgRouteUrl(id) ;
  return {
    openGraph: {
      title: userData?.name,
      description: `See all of ${userData?.name}'s predictions`,
      type: "website",
      url: getProfileUrl(id),
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: "Topic Cover Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: userData?.name,
      description: `See all of ${userData?.name}'s predictions`,
      images: [ogUrl],
    },
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { user, setUser } = useUserStore();
  const { data: totalFollowers } = useGetTotalFollowers(userId);
  const { data: userC, isLoading } = useGetUserByExternalAuthId(userId);

  const userBalance = Number(user?.balance) / 1000000;
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  useEffect(() => {
    handleOpenLoginModal();
    if (!user?.walletaddress) {
      handleOpenLoginModal();
    }
  }, []);
  const ogUrl = getApiOgRouteUrl(userId);

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#101010] relative">
      <NextSeo
        openGraph={{
          title: userC?.data,
          description: `See all of ${userC?.data}'s predictions`,
          type: "website",
          url: getProfileUrl(userId),
          images: [
            {
              url: ogUrl,
              width: 1200,
              height: 630,
              alt: "Topic Cover Image",
            },
          ],
        }}
        twitter={{
          handle: "@tryblitz",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />

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
        <motion.div
          className="absolute top-6 left-6 p-2 bg-[rgba(40, 40, 40, 0.6) backdrop-blur-lg "
          style={{ borderRadius: 25 }}
          onClick={() => router.push({ pathname: "/lp" })}
        >
          <PieChart size={19} strokeWidth={3} />
        </motion.div>
        <img
          src={userC?.pfp}
          className="h-[5rem] w-[5rem] rounded-full border-4 border-[#202020] "
          alt="Profile"
        />
        <div
          style={{ fontFamily: "Aeonik-Bold" }}
          className="text-white text-sm absolute top-[4rem] p-1 bg-[#202020] rounded-full font-bold mt-3"
        >
          0%
        </div>
        <p
          style={{ fontFamily: "Aeonik-Bold" }}
          className="text-white text-xl font-bold mt-6"
        >
          {userC?.name}
        </p>

        <div className="flex flex-col items-center mt-0">
          {userC?.socials?.twitter ? (
            <div className="flex items-center mt-0">
              <Twitter className="h-4 text-gray-200" />
              <p
                style={{ fontFamily: "Aeonik-Bold" }}
                className="text-gray-200 text-md font-bold ml-1"
              >
                @{userC?.socials?.twitter?.username}
              </p>
            </div>
          ) : userC?.socials?.farcaster ? (
            <div className="flex items-center mt-0">
              <img src="/farcaster.png" className="h-10 w-10" alt="Farcaster" />
              <p
                style={{ fontFamily: "Aeonik-Bold" }}
                className="text-gray-200 text-lg font-bold ml-1"
              >
                @{userC?.socials?.farcaster?.name}
              </p>
            </div>
          ) : null}
          <div className="flex items-center mt-2">
            <p
              style={{ fontFamily: "Aeonik-Bold" }}
              className="text-gray-100 text-sm bg-[#1B1B1E]  py-[0.5rem] px-4 rounded-2xl"
            >
              ${userBalance.toFixed(2)}
            </p>
            <p
              style={{ fontFamily: "Aeonik-Bold" }}
              className="text-gray-100 text-sm bg-[#1B1B1E] py-[0.5rem] px-4 rounded-2xl ml-2"
            >
              {totalFollowers} Followers
            </p>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  return {
    props: {
      userId: id,
    },
  };
};

export default ProfilePage;
