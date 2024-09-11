import { base } from "viem/chains"

import type { Chain } from "@/types/chain"

import * as all from "./master"

export * from "./supportedChains"

export const DEFAULT_CHAIN_ID = base.id

export type ChainsByChainID = {
  [cID: number]: Chain
}

export type ChainsByChainName = {
  [chainName: string]: Chain
}

export function sortChains(chains: Chain[]) {
  return Object.values(chains).sort((a, b) => b.priorityRank - a.priorityRank)
}

export const CHAINS_ARR = Object.values(all).sort(
  (a, b) => b.priorityRank - a.priorityRank
)

function getChainEnumById() {
  const outObj: Record<number, string> = {}
  CHAINS_ARR.map((chain) => {
    outObj[chain.id] = chain.codeName
  })
  return outObj
}

function getids() {
  const outObj = {} as Record<string, number>
  for (const chain of CHAINS_ARR) {
    outObj[chain.codeName] = chain.id
  }

  return outObj
}

function getChainsByID(): ChainsByChainID {
  const outObj: ChainsByChainID = {}
  CHAINS_ARR.map((chain) => {
    outObj[chain.id] = chain
  })
  return outObj
}

function getChainsByName(): ChainsByChainName {
  const outObj: ChainsByChainName = {}
  CHAINS_ARR.map((chain) => {
    outObj[chain.name] = chain
  })
  return outObj
}

function getChainsLowerByName(): ChainsByChainName {
  const outObj: ChainsByChainName = {}
  CHAINS_ARR.map((chain) => {
    outObj[chain.name.toLowerCase()] = chain
  })
  return outObj
}

export const CHAIN_ENUM_BY_ID = getChainEnumById()
export const CHAIN_IDS = getids() // used to be ids
export const CHAINS_BY_ID = getChainsByID()
export const CHAINS_BY_NAME = getChainsByName()

const CHAINS_BY_LOWER_NAME = getChainsLowerByName()

export function getChainId(name: string) {
  return CHAINS_BY_LOWER_NAME[name?.toLowerCase()]?.id
}

export function getChainNameFromId(id: number) {
  return CHAINS_BY_ID[id]?.name?.toLowerCase()
}
export const ORDERED_CHAINS_BY_ID = CHAINS_ARR.map((chain) => String(chain.id))

export const ChainId = {
  ETH: 1,
  BASE: 8453,
  BASE_SEPOLIA: 84532,
} as const

export const AcceptedChainId = Object.fromEntries(
  Object.entries(ChainId).map(([key, value]) => [value, key])
)
