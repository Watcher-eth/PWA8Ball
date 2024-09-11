// import type { BigNumber } from '@ethersproject/bignumber'
// import * as CHAINS from '@constants/chains/master'
// import { getAddress } from '@ethersproject/address'

export type Chain = {
  id: number
  chainSymbol: string
  name: string
  altName?: string
  codeName: string
  chainImg: any
  layer: number
  rpcUrls: { primary: string; fallback: string }
  explorerUrl: string
  explorerName: string
  explorerImg: any
  blockTime: number
  nativeCurrency: { name: string; symbol: string; decimals: number }
  priorityRank: number
  color?: string
  unsupported?: boolean
}

export enum WalletId {
  MetaMask = "metaMask",
  WalletConnect = "walletConnect",
  CoinbaseWallet = "coinbaseWallet",
}

export interface IconProps {
  walletId?: string
  className?: string
}
