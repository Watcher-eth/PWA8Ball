// @ts-nocheck

import { useMutation } from "@tanstack/react-query";
import { UsdcABI, getUSDCContract } from "../contracts/Usdc";
import { ethers } from "ethers";
import {
  EightBallAddress,
  EightballV1ABI,
  getEightBallContract,
} from "../contracts/Eightball";
import { rpcClient } from "../Viem";
import { WalletClient, getContract } from "viem";
import { SmartAccountClient } from "permissionless";
import { addLiquidityBoost } from "@/lib/supabase/mutations/addBoost";
import { supabase } from "@/lib/supabase/supabaseClient";

interface boostMarket {
  amount: number;
  userId: string;
  marketId: number;
  client: SmartAccountClient;
  address: `0x${string}`;
}

async function boostV2(props: boostMarket) {
  console.log("Amount", props.amount, props.userId);
  if (!props.amount || !props.marketId) {
    throw new Error("All fields must be provided");
  }
  console.log("Props", props);
  try {
    // Convert the _Amount to USDC's correct unit (typically 6 decimals)

    const account = props.address;

    const contract = getContract({
      abi: EightballV1ABI,
      address: EightBallAddress,
      client: { public: rpcClient, wallet: props.client },
    });
    console.log("Contract", contract);
    // Boost the market
    const hash = await contract.write.boostMarket([
      BigInt(props.amount),
      BigInt(props.marketId),
    ]);
    console.log("hash", hash);

    const send = await addLiquidityBoost({
      user_id: props.userId,
      market_id: props.marketId,
      amount_added: props.amount,
    });

    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("liquiditypoints")
      .eq("external_auth_provider_user_id", props.userId)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    const points = (props.amount / 10 ** 6) * 2;
    const newLiquidityPoints = (user?.liquiditypoints || 0) + points;

    // Update the liquidity points
    const { data, error: updateError } = await supabase
      .from("users")
      .update({ liquiditypoints: newLiquidityPoints })
      .match({ external_auth_provider_user_id: props?.userId })
      .single();
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
