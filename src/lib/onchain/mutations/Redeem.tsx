// @ts-nocheck
import { ethers } from "ethers";

import { useMutation } from "@tanstack/react-query";
import {
  EightBallAddress,
  EightballV1ABI,
} from "../contracts/Eightball";
import { WalletClient, getContract, Address } from "viem";
import { rpcClient } from "@/lib/onchain/rpcClient";
import { USDC_ABI } from "../contracts/Usdc";
import { OutcomeTokenABI } from "../contracts/OutcomeToken";
import { supabase } from "@/supabase/supabaseClient";
interface RedeemParams {
  marketId: number;
  outcomeTokenAddress: Address;
  userId: string;
  client: WalletClient;
  address: Address;
}

async function cashoutPrediction(props: RedeemParams) {
  console.log("Props", props.userId, props.marketId);
  if (!props.userId || !props.marketId) {
    throw new Error("All fields must be provided");
  }
  try {
    // Convert the _Amount to USDC's correct unit (typically 6 decimals)
    const account = props.address;

    const contract = getContract({
      abi: EightballV1ABI,
      address: EightBallAddress,
      client: { public: props.client, wallet: props.client },
    });

    const preferYesNum = props.preferYes ? 1 : 0;

    // Redeem position
    const hash = await contract.write.redeem([BigInt(props.marketId)]);

    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("liquiditypoints")
      .eq("external_auth_provider_user_id", props.userId)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    const points = 50;
    const newLiquidityPoints = (user?.liquiditypoints || 0) + points;

    // Update the liquidity points
    const { data, error: updateError } = await supabase
      .from("users")
      .update({ liquiditypoints: newLiquidityPoints })
      .match({ external_auth_provider_user_id: props?.userId })
      .single();

    console.log("Redeemed", hash);
    console.log("Redeemed");
  } catch (error) {
    console.error("Error during cashout", error);
    throw error; // Rethrow the error after logging it
  }
}

export const useCashout = () => {
  return useMutation({
    mutationFn: cashoutPrediction,
    onSuccess: () => {
      console.log("Redeemed successfully");
    },
    onError: (error) => {
      console.error("Error redeeming", error);
    },
  });
};
