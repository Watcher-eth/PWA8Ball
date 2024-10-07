import { useState, useEffect, useContext, createContext } from "react"

import {
  type Address,
  createPublicClient,
  createWalletClient,
  custom,
  http,
  WalletClient,
  PublicClient,
} from "viem"
import { useAccount, useConnect, useWalletClient } from "wagmi"
import { EIP1193Provider, usePrivy, useWallets } from "@privy-io/react-auth"
import {
  createSmartAccountClient,
  walletClientToSmartAccountSigner,
  ENTRYPOINT_ADDRESS_V07,
} from "permissionless"
import { smartAccount as createSmartAccountConnector } from "@permissionless/wagmi"
import { signerToSimpleSmartAccount } from "permissionless/accounts"
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico"

import { DEFAULT_CHAIN } from "@/constants/chains"

export const SMART_ACCOUNT_FACTORY_ADDRESS =
  "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985"
  
// export const BASE_GOERLI_ENTRYPOINT_ADDRESS =
//   "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"


/** Interface returned by custom `useSmartAccount` hook */

const SmartAccountContext = createContext({
  smartAccountClient: undefined,
})

export function SmartAccountProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { connectors, connect, status, error } = useConnect()

  const { ready, wallets } = useWallets()
  const { isConnected, address } = useAccount()
  const { data: client } = useWalletClient({
    account: address as Address,
    chainId: DEFAULT_CHAIN.id,
  })

  const {
    // user: privyUser,
    ready: userReady,
    authenticated,
    createWallet,
  } = usePrivy()

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  )

  // States to store the smart account and its status
  const [smartAccountReady, setSmartAccountReady] = useState(false)

  async function connectSmartAccount() {
    console.log("connecting smart account")
    const publicClient = createPublicClient({
      chain: DEFAULT_CHAIN, // Replace this with the chain of your app
      transport: http(),
    }) as PublicClient

    if (!publicClient) {
      console.error(new Error("publicClient not found"))
    }
    console.log("publicClient", publicClient)
    const eip1193provider = await embeddedWallet?.getEthereumProvider()
    // const walletClient = await getWalletClient(config)
    console.log("eip1193provider", eip1193provider)
    const privyClient = createWalletClient({
      account: embeddedWallet?.address as Address,
      chain: DEFAULT_CHAIN,
      // transport: http(),
      transport: custom(eip1193provider as EIP1193Provider),
    })
    console.log("privyClient", privyClient)

    const customSigner = walletClientToSmartAccountSigner(privyClient)

    const simpleSmartAccount = await signerToSimpleSmartAccount(publicClient, {
      entryPoint: ENTRYPOINT_ADDRESS_V07,
      signer: customSigner,
      factoryAddress: SMART_ACCOUNT_FACTORY_ADDRESS,
    })
    const pimlicoPaymaster = createPimlicoPaymasterClient({
      entryPoint: ENTRYPOINT_ADDRESS_V07,
      transport: http(process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_URL),
    })
    const pimlicoBundlerClient = createPimlicoBundlerClient({
      transport: http(process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_URL),
      entryPoint: ENTRYPOINT_ADDRESS_V07,
    })
    const smartAccountClient = createSmartAccountClient({
      account: simpleSmartAccount,
      bundlerTransport: http(process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_URL),
      middleware: {
        sponsorUserOperation: pimlicoPaymaster.sponsorUserOperation, // optional
        gasPrice: async () =>
          (await pimlicoBundlerClient.getUserOperationGasPrice()).fast, // if using pimlico bundler
      },
      chain: DEFAULT_CHAIN, // Replace this with the chain for your app
    })
    const connector = createSmartAccountConnector({
      // @ts-ignore
      smartAccountClient,
    })

    console.log({ connector })
    connect(
      {
        connector,
        chainId: DEFAULT_CHAIN.id,
      },
      {
        onSuccess: (...successArgs) => {
          console.log("successArgs", successArgs)
        },
        onError: (...errorArgs) => {
          console.log("errorArgs", errorArgs)
        },
        onSettled: (...settleArgs) => {
          console.log("settleArgs", settleArgs)
        },
      }
    )
    /** Lets see if prev autoapproval works
     * This needs to get moved outside of this useEffect
     */
    // approval logic goes here
    setSmartAccountReady(true)
  }

  async function createAndConnectSmartAccount() {
    if (!embeddedWallet && userReady && authenticated) {
      try {
        const wallet = await createWallet()
        console.log("createdwallet", wallet)
        console.log("successfully created wallet")
      } catch (error) {
        console.error("Failed to create wallet:", error)
      }
    }
    try {
      if (ready) {
        await connectSmartAccount()
      }
      console.log("connected smart account")
    } catch (error) {
      console.error("Failed to connect smart account:", error)
    }
  }
  useEffect(() => {
    if (!smartAccountReady) {
      console.log("connecting smart account")
      createAndConnectSmartAccount()
    }
  }, [
    isConnected,
    userReady,
    authenticated,
    smartAccountReady,
  ])

  return (
    <SmartAccountContext.Provider
      value={{
        // @ts-ignore
        smartAccountClient: client,
      }}
    >
      {children}
    </SmartAccountContext.Provider>
  )
}

export function useSmartAccount() {
  return useContext(SmartAccountContext)
}

// const allowance = await publicClient.readContract({
//   address: BASE_SEPOLIA_USDC_ADDRESS,
//   abi: USDC_ABI,
//   args: [
//     smartAccountClient.account?.address!,
//     BASE_SEPOLIA_EIGHTBALL_ADDRESS,
//   ],
//   functionName: "allowance",
// })
// if (allowance < 1n) {
//   console.log("allowance", allowance)
//   try {
//     const contract = getContract({
//       abi: USDC_ABI,
//       address: BASE_SEPOLIA_USDC_ADDRESS,
//       client: { public: rpcClient, wallet: smartAccountClient },
//     })
//     const hash = await contract.write.approve([
//       BASE_SEPOLIA_EIGHTBALL_ADDRESS,
//       10000000000n,
//     ])
//     console.log("hash", hash)
//   } catch (error) {
//     console.error("Failed to send transaction:", error)
//     // throw error
//   }
// }
