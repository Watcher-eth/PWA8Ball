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
import { ROOT_OPERATOR_ADDRESS } from "@/constants/operations";
import { BASE_SEPOLIA_EIGHTBALL_ADDRESS } from "@/constants/Onchain";
interface CashoutParams {
  preferYes: boolean;
  option: string;
  marketId: number;
  userId: string;
  client: SmartAccountClient;
  address: Address;
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

    const marketPair = await props.client.readContract({
      address: EightBallStorageAddress,
      abi: EightballStorageV1ABI,
      args: [currentPairId],
      functionName: "getMarketPair",
    });

    const tokenAddy = props.preferYes
      ? marketPair.yesToken
      : marketPair.noToken;

    const ownedTokens = await props.client.readContract({
      address: tokenAddy,
      abi: OutcomeTokenABI,
      args: [account],
      functionName: "balanceOf",
    });

    const contract = getContract({
      abi: EightballV1ABI,
      address: BASE_SEPOLIA_EIGHTBALL_ADDRESS,
      client: { public: props.client, wallet: props.client },
    });

    const preferYesNum = props.preferYes ? 1 : 0;

    const hash = await contract.write.cashOut([
      ownedTokens,
      preferYesNum,
      BigInt(props.marketId),
      ROOT_OPERATOR_ADDRESS,
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
