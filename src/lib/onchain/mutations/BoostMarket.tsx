import "fast-text-encoding";
import "react-native-get-random-values";
import "@ethersproject/shims";

import { useMutation } from "@tanstack/react-query";
import { UsdcABI, getUSDCContract } from "../contracts/Usdc";
import { ethers } from "ethers";
import {
  EightBallAddress,
  EightballV1ABI,
  getEightBallContract,
} from "../contracts/Eightball";
import { rpcClient } from "../Viem";
import { WalletClient } from "viem";
import { addLiquidityBoost } from "@/lib/drizzle/drizzle/supabase/mutations/addBoost";

interface boostMarket {
  amount: number;
  userId: string;
  marketId: number;
  client: WalletClient;
  address: `0x${string}`;
}

async function boost(props: boostMarket) {
  console.log("Amount", props.amount);
  if (!props.amount || !props.marketId) {
    throw new Error("All fields must be provided");
  }
  console.log("Props", props);
  try {
    // Convert the _Amount to USDC's correct unit (typically 6 decimals)
    const adjustedAmount = ethers.utils
      .parseUnits(props.amount.toString(), 6)
      .toBigInt();
    const account = props.address;
    const allowance = await rpcClient.readContract({
      address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      abi: UsdcABI,
      args: [account, EightBallAddress],
      functionName: "allowance",
    });
    console.log("current allowance", allowance);
    if (allowance < BigInt(props.amount)) {
      // Approve the USDC transfer
      const { request: usdcRequest } = await rpcClient.simulateContract({
        account,
        address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
        abi: UsdcABI,
        args: [EightBallAddress, BigInt(1500000)],
        functionName: "approve",
      });

      const usdcApproval = await props.client.writeContract(usdcRequest);
      console.log("Approved USDC", usdcApproval, account);
    }

    // Boost the market
    const { request } = await rpcClient.simulateContract({
      account,
      address: EightBallAddress,
      abi: EightballV1ABI,
      args: [BigInt(props.amount), BigInt(props.marketId)],
      functionName: "boostMarket",
    });

    const result = await props.client.writeContract(request);

    const send = await addLiquidityBoost({
      user_id: props.userId,
      market_id: props.marketId,
      amount_added: props.amount,
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
