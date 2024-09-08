// @ts-nocheck

import { useMutation } from "@tanstack/react-query";
import { EightballV1ABI } from "../contracts/Eightball";
import { type Address, getContract } from "viem";
import { SmartAccountClient } from "permissionless";
import {
  EightBallStorageAddress,
  EightballStorageV1ABI,
} from "../contracts/EightballStorage";
import { OutcomeTokenABI } from "../contracts/OutcomeToken";
import {
  BASE_SEPOLIA_STORAGE_ADDRESS,
  ROOT_OPERATOR_ADDRESS,
} from "@/constants/onchain";
import { BASE_SEPOLIA_EIGHTBALL_ADDRESS } from "@/constants/onchain";
import { rpcClient } from "../rpcClient";
interface CashoutParams {
  preferYes: boolean;
  option: string;
  marketId: number;
  userId: string;
  client: SmartAccountClient;
  address: Address;
  ownedTokens: number;
}

async function cashoutPrediction(props: CashoutParams) {
  console.log("Props", props.ownedTokens, props.preferYes);
  if (!props.marketId) {
    throw new Error("All fields must be provided");
  }
  try {
    const account = props.address;
    const currentPairId = BigInt(props?.marketId);

    const marketPair = await rpcClient.readContract({
      address: BASE_SEPOLIA_STORAGE_ADDRESS,
      abi: EightballStorageV1ABI,
      args: [currentPairId],
      functionName: "getMarketPair",
    });

    const tokenAddy = !props.preferYes
      ? marketPair.yesToken
      : marketPair.noToken;

    const outcomeToken = await getContract({
      abi: OutcomeTokenABI,
      address: tokenAddy,
      client: { public: rpcClient, wallet: props?.client },
    });

    const hash1 = await outcomeToken.write.approve([
      BASE_SEPOLIA_EIGHTBALL_ADDRESS,
      BigInt(1000000 * props.ownedTokens),
    ]);

    const contract = getContract({
      abi: EightballV1ABI,
      address: BASE_SEPOLIA_EIGHTBALL_ADDRESS,
      client: { public: rpcClient, wallet: props.client },
    });

    const preferYesNum = !props.preferYes ? 1 : 0;
    console.log("ownedTokens", props?.ownedTokens);
    const hash = await contract.write.cashOut([
      BigInt(props.ownedTokens),
      preferYesNum,
      BigInt(props.marketId),
      ROOT_OPERATOR_ADDRESS,
    ]);

    //TODO: Update to cashed out
    console.log("hash", hash);

    console.log("Cashed out");
  } catch (error) {
    console.error("Error during cashout", error);
    throw error;
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
