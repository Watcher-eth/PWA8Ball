// @ts-nocheck

import { useMutation } from "@tanstack/react-query";
import { USDC_ADDRESS, USDC_ABI, getUSDCContract } from "../contracts/Usdc";
import {
  EightBallAddress,
  EightballV1ABI,
  getEightBallContract,
} from "../contracts/Eightball";
import { rpcClient } from "@/lib/onchain/rpcClient";
import { WalletClient, Address } from "viem";
import { addLiquidityBoost } from "@/supabase/mutations/addLiquidityBoost";



async function boost({
  amount,
  userId,
  marketId,
  client,
  address,
}: {
  amount: number;
  userId: string;
  marketId: number;
  client: WalletClient;
  address: Address;
}) {
  console.log("Amount", amount);
  if (!amount || !marketId) {
    throw new Error("All fields must be provided");
  }
  // console.log("Props", props);
  try {
    const account = address;
    const allowance = await rpcClient.readContract({
      address: USDC_ADDRESS,
      abi: USDC_ABI,
      args: [account, EightBallAddress],
      functionName: "allowance",
    });
    console.log("current allowance", allowance);
    if (allowance < BigInt(amount)) {
      // Approve the USDC transfer
      const { request: usdcRequest } = await rpcClient.simulateContract({
        account,
        address: USDC_ADDRESS,
        abi: USDC_ABI,
        args: [EightBallAddress, 1500000n],
        functionName: "approve",
      });

      const usdcApproval = await client.writeContract(usdcRequest);
      console.log("Approved USDC", usdcApproval, account);
    }

    // Boost the market
    const { request } = await rpcClient.simulateContract({
      account,
      address: EightBallAddress,
      abi: EightballV1ABI,
      args: [BigInt(amount), BigInt(marketId)],
      functionName: "boostMarket",
    });

    const result = await client.writeContract(request);

    const send = await addLiquidityBoost({
      user_id: userId,
      market_id: marketId,
      amount_added: amount,
    });
  } catch (error) {
    console.error("Error during market boost", error);
    throw error; // Rethrow the error after logging it
  }
}

export const useBoostMarket = () => {
  return useMutation({
    mutationFn: boost,
    onSuccess: () => {
      console.log("Market boosted successfully");
      // Invalidate and refetch relevant queries here, if necessary
    },
    onError: (error) => {
      console.error("Error boosting market", error);
    },
  });
};
