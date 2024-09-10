import baseImg from '@/assets/chains/base.svg'

import ethereumImg from "@/assets/chains/ethereum.svg"

import ethImg from "@/assets/icons/eth.svg"
import ethExplorerImg from '@/assets/explorer/etherscan.svg'
import baseExplorerImg from '@/assets/explorer/basescan.svg'


import type { Chain } from '@/types/chain'

export const ETH: Chain = {
  priorityRank: 100,
  id: 1,
  chainSymbol: 'ETH',
  name: 'Ethereum',
  codeName: 'Ethereum',
  chainImg: ethImg,
  layer: 1,
  rpcUrls: {
    primary:
      'https://eth-mainnet.g.alchemy.com/v2/rJ3f0IWjZbpgEwnzrRS6yYO3WNH0jGle',
    fallback: 'https://eth.llamarpc.com',
  },
  explorerUrl: 'https://etherscan.com',
  explorerName: 'Etherscan',
  explorerImg: ethExplorerImg,
  blockTime: 12000,
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  color: 'eth',
}


export const BASE: Chain = {
  priorityRank: 95,
  id: 8453,
  chainSymbol: 'ETH',
  name: 'Base',
  codeName: 'base',
  chainImg: baseImg,
  layer: 2,
  rpcUrls: {
    primary:
      'https://base-mainnet.g.alchemy.com/v2/_YKy-Vm3LsknT8JKSa2ZTSmKu9Qp01Vd',
    fallback: 'https://developer-access-mainnet.base.org',
  },
  explorerUrl: 'https://basescan.org',
  explorerName: 'BaseScan',
  explorerImg: baseExplorerImg,
  blockTime: 3000,
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  color: 'blue',
}

export const BASE_SEPOLIA: Chain = {
  priorityRank: 95,
  id: 84532,
  chainSymbol: "ETH",
  name: "BaseSepolia",
  codeName: "baseSepolia",
  chainImg: baseImg,
  layer: 2,
  rpcUrls: {
    primary:
      "https://base-sepolia.g.alchemy.com/v2/1qIUvkVZ0LPtsnxzkWjbfsCyXuP413ur",
    fallback:
      "https://base-sepolia.g.alchemy.com/v2/1qIUvkVZ0LPtsnxzkWjbfsCyXuP413ur",
    // "https://base-mainnet.g.alchemy.com/v2/_YKy-Vm3LsknT8JKSa2ZTSmKu9Qp01Vd",
    // fallback: "https://developer-access-mainnet.base.org",
  },
  explorerUrl: "https://sepolia.basescan.org",
  explorerName: "BaseScan",
  explorerImg: baseExplorerImg,
  blockTime: 3000,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  color: "blue",
};

// TODO: UPDATE ALL PARAMETERS FOR MAINNET
