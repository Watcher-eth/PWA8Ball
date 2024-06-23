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
import { V2PairV1ABI } from "../contracts/V2Pair";
import {
  EightBallStorageAddress,
  EightballStorageV1ABI,
} from "../contracts/EightballStorage";

interface boostMarket {
  userId: string;
  marketId: number;
  client: SmartAccountClient;
  address: `0x${string}`;
}

async function removeLp(props: boostMarket) {
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
      abi: V2PairV1ABI,
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
