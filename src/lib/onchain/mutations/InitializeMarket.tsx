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
import { Address, WalletClient } from "viem";
import {
  EightBallStorageAddress,
  EightballStorageV1ABI,
} from "../contracts/EightballStorage";
import { ROOT_OPERATOR_ADDRESS } from "@/constants/operations";
import { createMarket } from "@/lib/supabase/mutations/createMarket";

interface initializeMarketTypes {
  amount: number;
  title: string;
  description: string;
  options: string[];
  topicId: string;
  image: string;
  client: WalletClient;
  address: Address;
  created_by: string;
  initialPron: number;
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

    const allowance = await rpcClient.readContract({
      address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      abi: UsdcABI,
      args: [account, EightBallAddress],
      functionName: "allowance",
    });

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
    const initialProb = props?.initialPron ? props?.initialPron : 50;
    // Initialize the market
    const { request } = await rpcClient.simulateContract({
      account,
      address: EightBallAddress,
      abi: EightballV1ABI,
      args: [account, ROOT_OPERATOR_ADDRESS, BigInt(initialProb)],
      functionName: "initializeMarket",
    });
    const result = await props.client.writeContract(request);

    setTimeout(async () => {
      const currentPairId = await rpcClient.readContract({
        address: EightBallStorageAddress,
        abi: EightballStorageV1ABI,
        functionName: "currentPairId",
      });

      const marketPair = await rpcClient.readContract({
        address: EightBallStorageAddress,
        abi: EightballStorageV1ABI,
        args: [currentPairId],
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
        id: Number(currentPairId), // Determine how you generate or retrieve this
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

export const useInitializeMarket = () => {
  return useMutation({
    mutationFn: initialize,
    onSuccess: (variables, data) => {},
    onError: (error) => {
      console.error("Error initializing market", error);
      // Handle errors appropriately in the UI
    },
  });
};
