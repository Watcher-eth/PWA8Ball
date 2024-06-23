// @ts-nocheck

import "fast-text-encoding";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

import { useMutation } from "@tanstack/react-query";
import {
  EightBallAddress,
  EightballV1ABI,
  getEightBallContract,
} from "../contracts/Eightball";
import { WalletClient, getContract } from "viem";
import { rpcClient } from "../Viem";
import { UsdcABI } from "../contracts/Usdc";
import { SmartAccountClient } from "permissionless";
import {
  EightBallStorageAddress,
  EightballStorageV1ABI,
} from "../contracts/EightballStorage";
import { OutcomeTokenABI } from "../contracts/OutcomeToken";
import { rootOperator } from "../../../../constants/Operations";
interface CashoutParams {
  preferYes: boolean;
  option: string;
  marketId: number;
  userId: string;
  client: SmartAccountClient;
  address: `0x${string}`;
}

async function cashoutPrediction(props: CashoutParams) {
  console.log("Props", props.marketId);
  if (!props.marketId) {
    throw new Error("All fields must be provided");
  }
  try {
    // Convert the _Amount to USDC's correct unit (typically 6 decimals)

    const account = props.address;
    const currentPairId = BigInt(props?.marketId);

    const marketPair = await rpcClient.readContract({
      address: EightBallStorageAddress,
      abi: EightballStorageV1ABI,
      args: [currentPairId],
      functionName: "getMarketPair",
    });
    
    const tokenAddy = props.preferYes
      ? marketPair.yesToken
      : marketPair.noToken;

    const ownedTokens = await rpcClient.readContract({
      address: tokenAddy,
      abi: OutcomeTokenABI,
      args: [account],
      functionName: "balanceOf",
    });
    console.log("owned", ownedTokens);
    const contract = getContract({
      abi: EightballV1ABI,
      address: EightBallAddress,
      client: { public: rpcClient, wallet: props.client },
    });

    const preferYesNum = props.preferYes ? 1 : 0;

    const hash = await contract.write.cashOut([
      ownedTokens,
      preferYesNum,
      BigInt(props.marketId),
      rootOperator,
    ]);

    //TODO: Update to cashed out
    console.log("hash", hash);

    console.log("Cashed out");
  } catch (error) {
    console.error("Error during cashout", error);
    throw error; // Rethrow the error after logging it
  }
}

export const useCashout = () => {
  return useMutation({
    mutationFn: cashoutPrediction,
    onSuccess: () => {
      console.log("Cashed out successfully");
    },
    onError: (error) => {
      console.error("Error cashing out", error);
    },
  });
};
