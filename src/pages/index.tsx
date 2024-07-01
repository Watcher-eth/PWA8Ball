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


export default function Home({ address }: { address?: string }) {

  //Lens Auth
  const { isLoginModalOpen, openLoginModal, closeLoginModal } =
    useAuthModalStore();
  return (
    <SmartAccountProvider>
      <div className="flex flex-col items-center py-2 min-h-screen  bg-[#101010]">
        <CardFeed />
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      </div>
    </SmartAccountProvider>
  );
}
