// @ts-nocheck

import { useMutation } from "@tanstack/react-query";

import { EightBallAddress, EightballV1ABI } from "../contracts/Eightball";
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
  console.log("Props", props);
  try {
    const account = props.address;
    const currentPairId = BigInt(props.marketId);

    const marketPair = await props.client.readContract({
      address: EightBallStorageAddress,
      abi: EightballStorageV1ABI,
      args: [currentPairId],
      functionName: "getMarketPair",
    });

    const liquidityTokens = await props.client.readContract({
      address: marketPair.liquidityPool,
      abi: V2_PAIR_ABI,
      args: [account],
      functionName: "balanceOf",
    });

    const contract = getContract({
      abi: EightballV1ABI,
      address: EightBallAddress,
      client: { public: props.client, wallet: props.client },
    });

    const hash = await contract.write.removeLiquidity([
      liquidityTokens,
      currentPairId,
    ]);
    
    console.log("hash", hash);
  } catch (error) {
    console.error("Error during market boost", error);
    throw error;
  }
}

export const useRemoveLp = () => {
  return useMutation({
    mutationFn: removeLp,
    onSuccess: () => {
      console.log("Market boosted successfully");
    },
    onError: (error) => {
      console.error("Error boosting market", error);
    },
  });
};
