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
import { WalletClient, Address } from "viem";
import { addLiquidityBoost } from "@/lib/supabase/mutations/addBoost";



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
    // Convert the _Amount to USDC's correct unit (typically 6 decimals)
    const adjustedAmount = ethers.utils
      .parseUnits(amount.toString(), 6)
      .toBigInt();
    const account = address;
    const allowance = await rpcClient.readContract({
      address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      abi: UsdcABI,
      args: [account, EightBallAddress],
      functionName: "allowance",
    });
    console.log("current allowance", allowance);
    if (allowance < BigInt(amount)) {
      // Approve the USDC transfer
      const { request: usdcRequest } = await rpcClient.simulateContract({
        account,
        address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
        abi: UsdcABI,
        args: [EightBallAddress, BigInt(1500000)],
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
