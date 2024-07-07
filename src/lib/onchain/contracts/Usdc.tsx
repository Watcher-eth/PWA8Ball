// @ts-nocheck
import {
  WalletClient,
  createPublicClient,
  custom,
  getContract,
  http,
  Address
} from "viem";

import { getWalletClient, rpcClient } from "@/lib/onchain/rpcClient";
import { EightBallAddress } from "./Eightball";

export const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e"; // Replace with your contract's address
const mainnetUSDC = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";

export const USDC_ABI = [
  {
    type: "function",
    name: "allowance",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "spender", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;


export async function getUSDCContract(walletClient: WalletClient) {
  // Use walletClient for write operations and rpcClient for read operations
  const contract = getContract({
    abi: USDC_ABI,
    address: USDC_ADDRESS,
    client: { public: rpcClient, wallet: walletClient },
  });

  return contract;
}

export async function getUSDCBalance(address: Address) {
  const balance = await rpcClient.readContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    args: [address],
    functionName: "balanceOf",
  });
  return balance;
}

export async function setUSDCBalance(
  address: Address,
  client: WalletClient
) {
  const account = address;
  const { request: usdcRequest } = await rpcClient.simulateContract({
    account,
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    args: [EightBallAddress, 1500000n],
    functionName: "approve",
  });
  console.log("after sim");
  const usdcApproval = await client.writeContract(usdcRequest);
  console.log("Approved USDC", usdcApproval, account);
  return usdcApproval;
}
