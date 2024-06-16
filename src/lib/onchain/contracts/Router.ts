import { useEmbeddedWallet } from "@privy-io/expo";
import { createPublicClient, custom, getContract, http } from "viem";
import { baseGoerli } from "viem/chains";
import { getWalletClient, rpcClient } from "../Viem";

const contractAddress = "0x2D5ed3c261FEdbe544DcB63b75c5F306ba35dFEA"; // Replace with your contract's address

export const RouterV1ABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_factory", type: "address", internalType: "address" },
      { name: "_WETH", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "WETH",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addLiquidity",
    inputs: [
      { name: "tokenA", type: "address", internalType: "address" },
      { name: "tokenB", type: "address", internalType: "address" },
      { name: "amountNew", type: "uint256", internalType: "uint256" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amountA", type: "uint256", internalType: "uint256" },
      { name: "amountB", type: "uint256", internalType: "uint256" },
      { name: "liquidity", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "factory",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAmountIn",
    inputs: [
      { name: "amountOut", type: "uint256", internalType: "uint256" },
      { name: "reserveIn", type: "uint256", internalType: "uint256" },
      { name: "reserveOut", type: "uint256", internalType: "uint256" },
      { name: "probOut", type: "int128", internalType: "int128" },
    ],
    outputs: [{ name: "amountIn", type: "uint256", internalType: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getAmountOut",
    inputs: [
      { name: "amountIn", type: "uint256", internalType: "uint256" },
      { name: "reserveIn", type: "uint256", internalType: "uint256" },
      { name: "reserveOut", type: "uint256", internalType: "uint256" },
      { name: "probIn", type: "int128", internalType: "int128" },
    ],
    outputs: [{ name: "amountOut", type: "uint256", internalType: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getAmountsIn",
    inputs: [
      { name: "amountOut", type: "uint256", internalType: "uint256" },
      { name: "path", type: "address[]", internalType: "address[]" },
    ],
    outputs: [
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAmountsOut",
    inputs: [
      { name: "amountIn", type: "uint256", internalType: "uint256" },
      { name: "path", type: "address[]", internalType: "address[]" },
    ],
    outputs: [
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "quote",
    inputs: [
      { name: "amountA", type: "uint256", internalType: "uint256" },
      { name: "reserveA", type: "uint256", internalType: "uint256" },
      { name: "reserveB", type: "uint256", internalType: "uint256" },
      { name: "probA", type: "int128", internalType: "int128" },
    ],
    outputs: [{ name: "amountB", type: "uint256", internalType: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "removeLiquidity",
    inputs: [
      { name: "tokenA", type: "address", internalType: "address" },
      { name: "tokenB", type: "address", internalType: "address" },
      { name: "liquidity", type: "uint256", internalType: "uint256" },
      { name: "amountAMin", type: "uint256", internalType: "uint256" },
      { name: "amountBMin", type: "uint256", internalType: "uint256" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amountA", type: "uint256", internalType: "uint256" },
      { name: "amountB", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeLiquidityETH",
    inputs: [
      { name: "token", type: "address", internalType: "address" },
      { name: "liquidity", type: "uint256", internalType: "uint256" },
      { name: "amountTokenMin", type: "uint256", internalType: "uint256" },
      { name: "amountETHMin", type: "uint256", internalType: "uint256" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amountToken", type: "uint256", internalType: "uint256" },
      { name: "amountETH", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeLiquidityETHSupportingFeeOnTransferTokens",
    inputs: [
      { name: "token", type: "address", internalType: "address" },
      { name: "liquidity", type: "uint256", internalType: "uint256" },
      { name: "amountTokenMin", type: "uint256", internalType: "uint256" },
      { name: "amountETHMin", type: "uint256", internalType: "uint256" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "amountETH", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeLiquidityETHWithPermit",
    inputs: [
      { name: "token", type: "address", internalType: "address" },
      { name: "liquidity", type: "uint256", internalType: "uint256" },
      { name: "amountTokenMin", type: "uint256", internalType: "uint256" },
      { name: "amountETHMin", type: "uint256", internalType: "uint256" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
      { name: "approveMax", type: "bool", internalType: "bool" },
      { name: "v", type: "uint8", internalType: "uint8" },
      { name: "r", type: "bytes32", internalType: "bytes32" },
      { name: "s", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [
      { name: "amountToken", type: "uint256", internalType: "uint256" },
      { name: "amountETH", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    inputs: [
      { name: "token", type: "address", internalType: "address" },
      { name: "liquidity", type: "uint256", internalType: "uint256" },
      { name: "amountTokenMin", type: "uint256", internalType: "uint256" },
      { name: "amountETHMin", type: "uint256", internalType: "uint256" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
      { name: "approveMax", type: "bool", internalType: "bool" },
      { name: "v", type: "uint8", internalType: "uint8" },
      { name: "r", type: "bytes32", internalType: "bytes32" },
      { name: "s", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [{ name: "amountETH", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeLiquidityWithPermit",
    inputs: [
      { name: "tokenA", type: "address", internalType: "address" },
      { name: "tokenB", type: "address", internalType: "address" },
      { name: "liquidity", type: "uint256", internalType: "uint256" },
      { name: "amountAMin", type: "uint256", internalType: "uint256" },
      { name: "amountBMin", type: "uint256", internalType: "uint256" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
      { name: "approveMax", type: "bool", internalType: "bool" },
      { name: "v", type: "uint8", internalType: "uint8" },
      { name: "r", type: "bytes32", internalType: "bytes32" },
      { name: "s", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [
      { name: "amountA", type: "uint256", internalType: "uint256" },
      { name: "amountB", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swapETHForExactTokens",
    inputs: [
      { name: "amountOut", type: "uint256", internalType: "uint256" },
      { name: "path", type: "address[]", internalType: "address[]" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "swapExactETHForTokens",
    inputs: [
      { name: "amountOutMin", type: "uint256", internalType: "uint256" },
      { name: "path", type: "address[]", internalType: "address[]" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
    inputs: [
      { name: "amountOutMin", type: "uint256", internalType: "uint256" },
      { name: "path", type: "address[]", internalType: "address[]" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "swapExactTokensForETH",
    inputs: [
      { name: "amountIn", type: "uint256", internalType: "uint256" },
      { name: "amountOutMin", type: "uint256", internalType: "uint256" },
      { name: "path", type: "address[]", internalType: "address[]" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    inputs: [
      { name: "amountIn", type: "uint256", internalType: "uint256" },
      { name: "amountOutMin", type: "uint256", internalType: "uint256" },
      { name: "path", type: "address[]", internalType: "address[]" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swapExactTokensForTokens",
    inputs: [
      { name: "amountIn", type: "uint256", internalType: "uint256" },
      { name: "amountOutMin", type: "uint256", internalType: "uint256" },
      { name: "path", type: "address[]", internalType: "address[]" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    inputs: [
      { name: "amountIn", type: "uint256", internalType: "uint256" },
      { name: "amountOutMin", type: "uint256", internalType: "uint256" },
      { name: "path", type: "address[]", internalType: "address[]" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swapTokensForExactETH",
    inputs: [
      { name: "amountOut", type: "uint256", internalType: "uint256" },
      { name: "amountInMax", type: "uint256", internalType: "uint256" },
      { name: "path", type: "address[]", internalType: "address[]" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swapTokensForExactTokens",
    inputs: [
      { name: "amountOut", type: "uint256", internalType: "uint256" },
      { name: "amountInMax", type: "uint256", internalType: "uint256" },
      { name: "path", type: "address[]", internalType: "address[]" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "nonpayable",
  },
] as const;

export const RouterV1Bytecode = "";

export async function getRouterContract() {
  const walletClient = await getWalletClient();

  // Use walletClient for write operations and rpcClient for read operations
  const contract = getContract({
    abi: RouterV1ABI,
    address: contractAddress,
    client: { public: rpcClient, wallet: walletClient },
  });

  return contract;
}
