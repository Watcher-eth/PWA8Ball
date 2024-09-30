// @ts-nocheck
import { useMutation } from "@tanstack/react-query"
import { WalletClient, getContract } from "viem"
import { SmartAccountClient } from "permissionless"

import { RootOperatorAddress } from "@/constants/onchain"
import { createMarket } from "@/supabase/mutations/createMarket"
import { EightBallConfig } from "@/lib/onchain/generated"
import { DEFAULT_CHAIN_ID } from "@/constants/chains"

async function initialize(props: {
  amount: number
  title: string
  description: string
  options: string[]
  topicId: string
  image: string
  client: SmartAccountClient
  address: Address
  created_by: string
  initialProb: number
}) {
  if (
    !props.amount ||
    !props.title ||
    !props.description ||
    !props.options ||
    !props.topicId ||
    !props.image
  ) {
    throw new Error("All fields must be provided")
  }
  try {
    const account = props.address

    const initialProb = props?.initialProb ? props?.initialProb : 50

    const contract = getContract({
      abi: EightBallConfig.abi,
      address: EightBallConfig.address[DEFAULT_CHAIN_ID],
      client: { public: props.client, wallet: props.client },
    })
    const operatorAddress = RootOperatorAddress[DEFAULT_CHAIN_ID]
    // Initialize the market
    const hash = await contract.write.initializeMarket(
      [
        operatorAddress,
        operatorAddress,
        account,
        BigInt(initialProb),
        {
          topicId: Number(props.topicId),
          outcomeA: props.options[0],
          outcomeB: props.options[1],
          title: props.title,
          question: props.description,
        },
      ],
      {}
    )

    console.log("hash", hash)

    setTimeout(async () => {
      const marketData = {
        title: props.title,
        question: props.description,
        image: props.image,
        options: props.options,
        topicid: props.topicId,
        participants: 0,
        created_by: props.created_by,
      }

      const send = await createMarket(marketData, props.client)
    }, 2000)
  } catch (error) {
    console.error("Error during market initialization", error)
    throw error // Rethrow the error after logging it
  }
}

export const useInitializeMarketV2 = () => {
  return useMutation({
    mutationFn: initialize,
    onSuccess: (variables, data) => {},
    onError: (error) => {
      console.error("Error initializing market", error)
      // Handle errors appropriately in the UI
    },
  })
}
