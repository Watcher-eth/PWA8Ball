import {
  EightBallAddress,
  EightBallAdminAddress,
  EightBallStorageAddress,
  FeeManagerV2Address,
  PairFactoryV1Address,
  RouterV1Address,
} from "@/lib/onchain/generated"
import type { Address } from "viem"
//Testnet (Base Sepolia)
export const BASE_SEPOLIA_USDC_ADDRESS =
  "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as const
export const BASE_SEPOLIA_EIGHTBALL_ADDRESS = EightBallAddress[84532]
export const BASE_SEPOLIA_ROUTER_ADDRESS = RouterV1Address[84532]
export const BASE_SEPOLIA_STORAGE_ADDRESS = EightBallStorageAddress[84532]
export const BASE_SEPOLIA_CREATOR_RESOLUTION_ADDRESS = ""
export const BASE_SEPOLIA_PAIR_FACTORY = PairFactoryV1Address[84532]
export const BASE_SEPOLIA_FEE_MANAGER = FeeManagerV2Address[84532]
export const BASE_SEPOLIA_ADMIN_CONTRACT = EightBallAdminAddress[84532]

//Mainnet (Base)
export const BASE_USDC_ADDRESS =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const
export const BASE_EIGHTBALL_ADDRESS =
  "0x0E49F5F62F7F938fd863e470F485B5e13f95Ace3" as const
export const BASE_ROUTER_ADDRESS =
  "0x0a40c9AA95D1bf885fCB273897000B4D67A0cac4" as const
export const BASE_STORAGE_ADDRESS =
  "0x745082aB9200A49E604c2761A43fACE99F6C9b50" as const
export const BASE_PAIR_FACTORY =
  "0x0E49F5F62F7F938fd863e470F485B5e13f95Ace3" as const
export const BASE_FEE_MANAGER =
  "0x52b3803cb1793ed62B8F1E2338c099C74679995F" as const
export const BASE_ADMIN_CONTRACT =
  "0x81218167d2d6FADed05Fa822d3c0e28e4775e891" as const

//Operations
//Recipient (Protocol Fee)
export const BASE_FEE_ADDRESS =
  "0xF1068eCe146Be3E4aC1d90f739C5a42A8bFc5853" as const

//Operator (Client / Frontend provider)
export const BASE_OPERATOR_ADDRESS =
  "0xF1068eCe146Be3E4aC1d90f739C5a42A8bFc5853" as const

//Operator (Admin / Frontend provider)
export const ROOT_OPERATOR_ADDRESS =
  "0xF1068eCe146Be3E4aC1d90f739C5a42A8bFc5853" as const
