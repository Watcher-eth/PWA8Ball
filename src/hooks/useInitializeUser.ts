import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { v5 as uuidv5 } from "uuid";
import { useUserStore } from "@/lib/stores/UserStore";

import { useGetUserById } from "@/graphql/queries/users/useUserById";

import { useGetTotalFollowers } from "@/supabase/queries/user/useGetTotalFollowers";
import { useGetTotalFollowing } from "@/supabase/queries/user/getTotalFollowing";
import { useCreateUser } from "@/hooks/actions/UserRegistry/useCreateUser";

const NAMESPACE = "10e62626-6a5d-45ef-96d8-02682a9977a7"; // Define a static namespace for generating UUIDs
const DEFAULT_PFP =
  "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQalRrZ3DhpviKTK_4Mn_uCvClxYNP5QntBI2GluPXMX77Ps3A6";

export function useInitializeUser() {
  const { ready, authenticated, user: privyUser } = usePrivy();
  const { user, setUser } = useUserStore();

  const { address, isConnected } = useAccount();
  const { handleCreateUser } = useCreateUser();
  const { data: followersCount } = useGetTotalFollowers(address!);
  const { data: followingCount } = useGetTotalFollowing(address!);
  const { user: ponderUser } = useGetUserById(address!);
  console.log("addyy", { user, ponderUser });

  async function fetchUser() {
    try {
      if (!address || !isConnected) {
        return;
      }
      const walletType =
        ready && authenticated && privyUser ? "smartwallet" : "eoa";

      console.log(privyUser);

      console.log("before user");
      console.log("ponderUser", ponderUser, address);

      if (ponderUser) {
        setUser({
          ...ponderUser,
          pfp: ponderUser?.pfp || DEFAULT_PFP,
          walletType,
          totalFollowers: followersCount ?? 0,
          totalFollowing: followingCount ?? 0,
        });
      } else {
        const userUUID =
          walletType === "eoa" ? uuidv5(address, NAMESPACE) : privyUser?.id;

        const newUser = {
          id: address!,
          walletAddress: address!,
          name: user?.name || "Anon",
          pfp: user?.pfp || DEFAULT_PFP,
          // @ts-ignore
          socials: user?.socials || "{}",
          externalAuthProviderUserId: userUUID!,
          updatedAt: BigInt(Math.floor(Date.now() / 1000)),
          createdAt: BigInt(Math.floor(Date.now() / 1000)),
        };

        setUser({
          ...newUser,
          totalFollowers: followersCount ?? 0,
          totalFollowing: followingCount ?? 0,
          walletType,
          isRegistered: false,
        });
        if (walletType === "smartwallet") {
          console.log("Creating user in smartwallet");
          const tx = await handleCreateUser(newUser);
          console.log("Created new user:", newUser, tx);
        }
      }
    } catch (error) {
      console.error("Error fetching or creating user:", error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [
    ready,
    authenticated,
    ponderUser?.id,
    // privyUser,
    address,
    isConnected,
    // eoaAddress,
    followersCount,
  ]);
  useEffect(() => {
    if (!isConnected) {
      setUser(null);
    }
  }, [isConnected]);
}
