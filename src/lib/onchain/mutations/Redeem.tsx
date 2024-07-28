// @ts-nocheck
import { ethers } from "ethers";

import { useMutation } from "@tanstack/react-query";
import { EightballV1ABI } from "../contracts/Eightball";
import { WalletClient, getContract, Address } from "viem";
import { rpcClient } from "@/lib/onchain/rpcClient";
import { USDC_ABI } from "../contracts/Usdc";
import { OutcomeTokenABI } from "../contracts/OutcomeToken";
import { supabase } from "@/supabase/supabaseClient";
import { useUpdateLiquidityPoints } from "@/supabase/mutations/user/useUpdateUserLiquidityPoints";
import { BASE_SEPOLIA_EIGHTBALL_ADDRESS } from "@/constants/onchain";
interface RedeemParams {
  marketId: number;
  outcomeTokenAddress: Address;
  userId: string;
  client: WalletClient;
  address: Address;
}

async function cashoutPrediction(props: RedeemParams) {
  const { updateLiquidityPoints } = useUpdateLiquidityPoints();
  if (!props.userId || !props.marketId) {
    throw new Error("All fields must be provided");
  }
  try {
    const contract = getContract({
      abi: EightballV1ABI,
      address: BASE_SEPOLIA_EIGHTBALL_ADDRESS,
      client: { public: props.client, wallet: props.client },
    });

    // Redeem position
    const hash = await contract.write.redeem([BigInt(props.marketId)]);
    console.log("Redeemed", hash);

    await updateLiquidityPoints(props.userId, 50);
  } catch (error) {
    console.error("Error during cashout", error);
    throw error;
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
