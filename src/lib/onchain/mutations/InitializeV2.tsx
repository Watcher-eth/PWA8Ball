// @ts-nocheck

import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import { UsdcABI, getUSDCContract } from "../contracts/Usdc";
import {
  EightBallAddress,
  EightballV1ABI,
  getEightBallContract,
} from "../contracts/Eightball";
import { rpcClient } from "../Viem";
import { WalletClient, getContract } from "viem";
import { SmartAccountClient } from "permissionless";
import {
  EightBallStorageAddress,
  EightballStorageV1ABI,
} from "../contracts/EightballStorage";
import { rootOperator } from "../../../../constants/Operations";
import { createMarket } from "@/lib/supabase/mutations/createMarket";

interface initializeMarketTypes {
  amount: number;
  title: string;
  description: string;
  options: string[];
  topicId: string;
  image: string;
  client: SmartAccountClient;
  address: `0x${string}`;
  created_by: string;
  initialProb: number;
}

async function initialize(props: initializeMarketTypes) {
  if (
    !props.amount ||
    !props.title ||
    !props.description ||
    !props.options ||
    !props.topicId ||
    !props.image
  ) {
    throw new Error("All fields must be provided");
  }
  try {
    // Parse the amount to the correct unit expected by the contract
    const account = props.address;
    const adjustedAmount = ethers.utils
      .parseUnits(props.amount.toString(), 6)
      .toBigInt();

    // Initialize the market
    const initialProb = props?.initialProb ? props?.initialProb : 50;

    const contract = getContract({
      abi: EightballV1ABI,
      address: EightBallAddress,
      client: { public: rpcClient, wallet: props.client },
    });
    // Boost the market
    const hash = await contract.write.initializeMarket([
      rootOperator,
      account,
      BigInt(initialProb),
    ]);

    console.log("hash", hash);

    setTimeout(async () => {
      const currentPairId = await rpcClient.readContract({
        address: EightBallStorageAddress,
        abi: EightballStorageV1ABI,
        functionName: "currentPairId",
      });
      console.log("currentPair", currentPairId - BigInt(1));
      const marketPair = await rpcClient.readContract({
        address: EightBallStorageAddress,
        abi: EightballStorageV1ABI,
        args: [currentPairId - BigInt(1)],
        functionName: "getMarketPair",
      });

      const send = await createMarket({
        title: props.title,
        question: props.description,
        image: props.image, // Add your image handling
        options: props.options.map((option, index) => ({
          name: option,
          address: index === 0 ? marketPair.yesToken : marketPair.noToken, // Example placeholder
        })),
        id: Number(currentPairId) - 1, // Determine how you generate or retrieve this
        topicid: props.topicId,
        participants: 0,
        pair: marketPair.liquidityPool,
        created_by: props.created_by,
      });
    
    }, 1000);
  } catch (error) {
    console.error("Error during market initialization", error);
    throw error; // Rethrow the error after logging it
  }
}

export const useInitializeMarketV2 = () => {
  return useMutation({
    mutationFn: initialize,
    onSuccess: (variables, data) => {},
    onError: (error) => {
      console.error("Error initializing market", error);
      // Handle errors appropriately in the UI
    },
  });
};
