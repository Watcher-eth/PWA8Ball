// @ts-nocheck

import { useMutation } from "@tanstack/react-query";

import { EightballV1ABI } from "../contracts/Eightball";
import { rpcClient } from "@/lib/onchain/rpcClient";
import { WalletClient, getContract, Address } from "viem";
import { SmartAccountClient } from "permissionless";
import { addLiquidityBoost } from "@/supabase/mutations/addLiquidityBoost";
import { supabase } from "@/supabase/supabaseClient";
import { BASE_SEPOLIA_EIGHTBALL_ADDRESS } from "@/constants/onchain";

interface BoostMarket {
  amount: number;
  userId: string;
  marketId: number;
  client: SmartAccountClient;
  address: Address;
}

async function boostV2(props: BoostMarket) {
  if (!props.amount || !props.marketId) {
    throw new Error("All fields must be provided");
  }
  try {
    const contract = getContract({
      abi: EightballV1ABI,
      address: BASE_SEPOLIA_EIGHTBALL_ADDRESS,
      client: { public: props.client, wallet: props.client },
    });

    // Boost the market
    const hash = await contract.write.addLiquidity([
      BigInt(props.amount),
      BigInt(props.marketId),
    ]);
    // console.log("hash", hash);

    //Update DB
    await addLiquidityBoost({
      user_id: props.userId,
      market_id: props.marketId,
      amount_added: props.amount,
    });
  } catch (error) {
    console.error("Error during market boost", error);
    throw error; // Rethrow the error after logging it
  }
}

export const useBoostMarket2 = () => {
  return useMutation({
    mutationFn: boostV2,
    onSuccess: () => {
      console.log("Market boosted successfully");
      // Invalidate and refetch relevant queries here, if necessary
    },
    onError: (error) => {
      console.error("Error boosting market", error);
    },
  });
};
