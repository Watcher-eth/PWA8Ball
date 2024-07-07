// @ts-nocheck

import { useMutation } from "@tanstack/react-query";

import {
  EightBallAddress,
  EightballV1ABI,
  getEightBallContract,
} from "../contracts/Eightball";
import { rpcClient } from "@/lib/onchain/rpcClient";
import { type Address, getContract } from "viem";
import { SmartAccountClient } from "permissionless";
import { V2_PAIR_ABI } from "../contracts/V2Pair";
import {
  EightBallStorageAddress,
  EightballStorageV1ABI,
} from "../contracts/EightballStorage";

async function removeLp(props: {
  userId: string;
  marketId: number;
  client: SmartAccountClient;
  address: Address;
}) {
  if (!props.marketId) {
    throw new Error("All fields must be provided");
  }
  console.log("Props", props.client);
  try {
    // Convert the _Amount to USDC's correct unit (typically 6 decimals)

    const account = props.address;
    const currentPairId = BigInt(props.marketId);

    const marketPair = await rpcClient.readContract({
      address: EightBallStorageAddress,
      abi: EightballStorageV1ABI,
      args: [currentPairId],
      functionName: "getMarketPair",
    });

    const liquidityTokens = await rpcClient.readContract({
      address: marketPair.liquidityPool,
      abi: V2_PAIR_ABI,
      args: [account],
      functionName: "balanceOf",
    });

    const contract = getContract({
      abi: EightballV1ABI,
      address: EightBallAddress,
      client: { public: rpcClient, wallet: props.client },
    });

    // Boost the market
    const hash = await contract.write.removeLiquidity([
      liquidityTokens,
      currentPairId,
    ]);
    console.log("hash", hash);
  } catch (error) {
    console.error("Error during market boost", error);
    throw error; // Rethrow the error after logging it
  }
}

export const useRemoveLp = () => {
  return useMutation({
    mutationFn: removeLp,
    onSuccess: () => {
      console.log("Market boosted successfully");
      // Invalidate and refetch relevant queries here, if necessary
    },
    onError: (error) => {
      console.error("Error boosting market", error);
    },
  });
};
