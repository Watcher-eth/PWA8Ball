
import type { Address } from "viem"
import { base, baseSepolia } from "viem/chains"

export const RootOperatorAddress = {
  [baseSepolia.id]: "0xF1068eCe146Be3E4aC1d90f739C5a42A8bFc5853",
  [base.id]: "0x3DE76DBB97e0EfD0ea8287082dF450cc59927574",
} as const

