// @ts-nocheck

import SearchModal from "@/components/Search/SearchModal";
import { useProfile } from "@/lib/context/context";
import { useEffect, useState } from "react";
import Header from "@/components/HomeScreen/Header";
import VotingModal from "@/components/Modals/BuyVotes";
import LoginModal from "@/components/Modals/LoginModal";
import ShareModal from "@/components/Modals/ShareModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import CardFeed from "@/components/Feed/CardFeed";

import { useAuthModalStore, useModalStore } from "@/lib/stores/ModalStore";
import { SmartAccountProvider } from "@/lib/onchain/SmartAccount";
import { Metadata, ResolvingMetadata } from "next";
import { NextSeo } from "next-seo";
import { OG_API_SPLASH_URL } from "@/utils/urls";

// export async function generateMetadata(
//   { params },
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   if (error) {
//     console.error(error);
//   }
//   const ogUrl = OG_API_SPLASH_URL

//   return {
//     openGraph: {
//       title: "Blitz",
//       description: `Predict the future with your friends`,
//       type: "website",
//       url: `https://pwa-8-ball.vercel.app/`,
//       images: [
//         {
//           url: ogUrl,
//           width: 1200,
//           height: 630,
//           alt: "Splash Image",
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "Blitz",
//       description: `Predict the future with your friends`,
//       images: [ogUrl],
//     },
//   };
// }
export default function Home({ address }: { address?: string }) {

  const ogUrl = OG_API_SPLASH_URL;

  //Lens Auth
  const { isLoginModalOpen, openLoginModal, closeLoginModal } =
    useAuthModalStore();
  return (
    <SmartAccountProvider>
      <NextSeo
        title="Blitz"
        description="Predict the future with your friends"
          openGraph={{
            title: "Blitz",
            description: `Predict the future with your friends`,
            type: "website",
            url: `https://pwa-8-ball.vercel.app/`,
            images: [
              {
                url: ogUrl,
                width: 1200,
                height: 630,
                alt: "Splash Image",
              },
            ],
          }}
          twitter={{
            handle: "@tryblitz",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
      <div className="flex flex-col items-center py-2 min-h-screen  bg-[#101010]">
        <CardFeed />
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      </div>
    </SmartAccountProvider>
  );
}
