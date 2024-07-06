// @ts-nocheck

import { ethers } from "ethers";

import { useMutation } from "@tanstack/react-query";
import {
  EightBallAddress,
  EightballV1ABI,
  getEightBallContract,
} from "../contracts/Eightball";

import { type Address, getContract } from "viem";
import { rpcClient } from "../Viem";
import { UsdcABI } from "../contracts/Usdc";
import { SmartAccountClient } from "permissionless";
import { createPrediction } from "@/lib/supabase/mutations/addPrediction";
import { supabase } from "@/lib/supabase/supabaseClient";
import { rootOperator } from "../../../../constants/Operations";
interface PredictParams {
  amount: number;
  preferYes: boolean;
  option: string;
  isBuy: boolean;
  marketId: number;
  userId: string;
  client: SmartAccountClient;
  address: Address;
}

async function predict(props: PredictParams) {
  console.log("Props", props.amount, props.marketId);
  if (!props.amount || !props.marketId) {
    throw new Error("All fields must be provided");
  }
  try {
    // Convert the _Amount to USDC's correct unit (typically 6 decimals)
    const adjustedAmount = ethers.utils
      .parseUnits(props.amount.toString(), 6)
      .toBigInt();
    const account = props.address;

    const preferYesNum = props.preferYes ? 1 : 0;
    console.log("props2", props.address, props.client  )
    const contract = getContract({
      abi: EightballV1ABI,
      address: EightBallAddress,
      client: { public: rpcClient, wallet: props.client },
    });

    console.log("Contract", contract);

    //TODO: Custom slippage
    // Execute User Prediction
    const hash = await contract.write.predict([
      BigInt(props.amount / 10),
      preferYesNum,
      BigInt(props.marketId),
      rootOperator,
      990,
    ]);

    console.log("Prediction hash", hash);

    //TODO: Integrate Multiplier
    const send = await createPrediction({
      user_id: props.userId,
      market_id: props.marketId,
      amount: props.amount,
      option: props.option,
      multiplier: 2.2,
    });

    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("liquiditypoints")
      .eq("external_auth_provider_user_id", props.userId)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    const points = (props.amount / 10 ** 6) * 2;
    const newLiquidityPoints = (user?.liquiditypoints || 0) + points;

    // Update the liquidity points
    const { data, error: updateError } = await supabase
      .from("users")
      .update({ liquiditypoints: newLiquidityPoints })
      .match({ external_auth_provider_user_id: props?.userId })
      .single();

    console.log("Added Prediction to DB", send);
  } catch (error) {
    console.error("Error during prediction", error);
    throw error; // Rethrow the error after logging it
  }
}

export const usePredictV2 = () => {
  return useMutation({
    mutationFn: predict,
    onSuccess: () => {
      console.log("Prediction made successfully");
    },
    onError: (error) => {
      console.error("Error making prediction", error);
    },
  });
};
