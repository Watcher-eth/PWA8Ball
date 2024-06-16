import SearchModal from "@/components/Search/SearchModal";
import { useProfile } from "@/lib/context/context";
import { ConnectKitButton, useSIWE } from "connectkit";
import { useEffect, useState } from "react";
import Header from "@/components/HomeScreen/Header";
import { polygon } from "@wagmi/core/chains";
import VotingModal from "@/components/Modals/BuyVotes";
import LoginModal from "@/components/Modals/LoginModal";
import ShareModal from "@/components/Modals/ShareModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import CardFeed from "@/components/Feed/CardFeed";
import LandingPage from "@/components/landingPage.tsx";

export default function Home({ address }: { address?: string }) {
  const { data: siweData, isSignedIn, signOut, signIn } = useSIWE();
  const userProfile = useProfile();
  const profile = userProfile?.profile;
  const [isLensAuth, setIsLensAuth] = useState<boolean>();

  const userDataQuery = useQuery({
    queryKey: ["whoami", siweData?.address],
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 60 * 1000,
    queryFn: async () => {
      const res = await fetch("/api/auth/me");
      const json = await res.json();
      return json;
    },
  });

  //Lens Auth

  useEffect(() => {}, [address, isSignedIn, profile]);

  return (
    <div className="flex flex-col items-center py-2 min-h-screen  bg-[#101010]">
      <CardFeed />
    </div>
  );
}
